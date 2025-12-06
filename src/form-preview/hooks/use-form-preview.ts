import parserBabel from "prettier/plugins/babel"
import parserEstree from "prettier/plugins/estree"
import parserHtml from "prettier/plugins/html"
import parserTypeScript from "prettier/plugins/typescript"
import prettier from "prettier/standalone"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation } from "wouter"
import { useShallow } from "zustand/shallow"
import { STRING_COMPONENT_NAMES } from "@/shared/constants"
import { useAppStore } from "@/shared/stores"
import { FIELDS_TYPES_COUNT_INITIAL_VALUE } from "../constants"
import {
  generateCheckboxHandler,
  generateFormDataType,
  generateInitialFormData,
  generateInputCommonHandler,
  generateInputNumberHandler,
} from "../utils"
import { generateInputElementsList } from "../utils/generate-inputs-elements"

export const useFormPreview = () => {
  const [_, navigate] = useLocation()
  const [formStringComponent, setFormStringComponent] = useState<string>("")
  const { schema, isValidSchema } = useAppStore(
    useShallow(({ schema, isValidSchema }) => ({ schema, isValidSchema })),
  )

  const fieldsTypesCount = useMemo(() => {
    const typesCount = { ...FIELDS_TYPES_COUNT_INITIAL_VALUE }
    Object.values(schema?.fields || {}).forEach(({ type }) => {
      typesCount[type] = (typesCount[type] || 0) + 1
    })
    return typesCount
  }, [schema])

  const inputCommonHandler = useMemo(() => {
    if (
      fieldsTypesCount.text < 1 &&
      fieldsTypesCount.radio < 1 &&
      fieldsTypesCount.select < 1 &&
      fieldsTypesCount.textarea < 1
    )
      return false
    return generateInputCommonHandler()
  }, [
    fieldsTypesCount.text,
    fieldsTypesCount.radio,
    fieldsTypesCount.select,
    fieldsTypesCount.textarea,
  ])

  const inputNumberHandler = useMemo(() => {
    if (fieldsTypesCount.number < 1) return false
    return generateInputNumberHandler()
  }, [fieldsTypesCount.number])

  const checkboxHandler = useMemo(() => {
    if (fieldsTypesCount.checkbox < 1) return false
    return generateCheckboxHandler()
  }, [fieldsTypesCount.checkbox])

  const inputsElements = useMemo(() => {
    if (!schema) return ""

    return generateInputElementsList(schema.fields)
  }, [schema])

  const buildFormStringComponent = useCallback(() => {
    if (!schema) return ""

    const formDataType = generateFormDataType(schema)
    const formInitialData = generateInitialFormData(schema)

    let code = `import type React from "react"\n`
    code += `import { useState } from "react"\n\n`
    code += `${formDataType}\n`
    code += `${formInitialData}\n\n`
    code += `export const ${schema.name}Form = () => {\n`
    code += `const [formData, setFormData] = useState<${STRING_COMPONENT_NAMES.FORM_DATA_TYPE}>(${STRING_COMPONENT_NAMES.FORM_INITIAL_DATA})\n`

    if (inputCommonHandler) {
      code += `${inputCommonHandler}\n`
    }
    if (inputNumberHandler) {
      code += `${inputNumberHandler}\n`
    }
    if (checkboxHandler) {
      code += `${checkboxHandler}\n`
    }

    code += `  const handleSubmit = (e: React.FormEvent) => {\n`
    code += `    e.preventDefault()\n`
    code += `    console.log(formData)\n`
    code += `  }\n\n`

    code += `  const handleReset = (e: React.FormEvent) => {\n`
    code += `    e.preventDefault()\n`
    code += `    setFormData(${STRING_COMPONENT_NAMES.FORM_INITIAL_DATA})\n`
    code += `  }\n\n`

    code += `  return (\n`
    code += `    <form onSubmit={handleSubmit} onReset={handleReset}>\n`
    code += `      ${inputsElements}\n`
    code += `      <button type="submit">Submit</button>\n`
    code += `      <button type="reset">Reset</button>\n`
    code += `    </form>\n`
    code += `  )\n`
    code += `}\n`

    return code
  }, [schema, inputsElements, checkboxHandler, inputNumberHandler, inputCommonHandler])

  useEffect(() => {
    // Aquí podríamos formatear el código con Prettier si es necesario
    const formatCode = async () => {
      const formComponent = buildFormStringComponent()
      try {
        const formatted = await prettier.format(formComponent, {
          parser: "babel-ts",
          plugins: [
            parserBabel, // keep JSX support
            parserEstree,
            parserHtml,
            parserTypeScript,
          ],
          semi: false,
          singleQuote: true,
          printWidth: 90,
        })

        setFormStringComponent(formatted)
      } catch (err) {
        console.error("‼️ Error formatting:", err)
        setFormStringComponent(formComponent) // fallback
      }
    }

    formatCode()
  }, [buildFormStringComponent])

  useEffect(() => {
    if (!isValidSchema) {
      navigate("/")
    }
  }, [isValidSchema, navigate])

  return { formStringComponent, formName: schema?.name || "" }
}
