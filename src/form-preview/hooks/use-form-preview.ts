import parserBabel from "prettier/plugins/babel"
import parserEstree from "prettier/plugins/estree"
import parserHtml from "prettier/plugins/html"
import parserTypeScript from "prettier/plugins/typescript"
import prettier from "prettier/standalone"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { TFieldType, TFormSchemaType } from "@/schema-builder/models"
import { FIELDS_TYPES_COUNT_INITIAL_VALUE } from "../constants"
import {
  generateCheckboxHandler,
  generateFormDataType,
  generateInputCommonHandler,
  generateInputNumberHandler,
  getDefaultValue,
} from "../utils"
import { generateInputElementsList } from "../utils/generate-inputs-elements"

export const useFormPreview = ({ schema }: { schema: TFormSchemaType }) => {
  const [formStringComponent, setFormStringComponent] = useState<string>("")
  const [fieldsTypesCount, setFieldsTypesCount] = useState<Record<TFieldType, number>>(
    FIELDS_TYPES_COUNT_INITIAL_VALUE,
  )

  useEffect(() => {
    console.log("🦊 schema", schema)
    console.log("🦊 fieldsTypesCount", fieldsTypesCount)
  }, [schema, fieldsTypesCount])

  useEffect(() => {
    const typesCount = { ...FIELDS_TYPES_COUNT_INITIAL_VALUE }
    Object.values(schema.fields).forEach(({ type }) => {
      typesCount[type] = (typesCount[type] || 0) + 1
    })
    setFieldsTypesCount(typesCount)
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
    return generateInputElementsList(schema.fields)
  }, [schema])

  const buildFormStringComponent = useCallback(() => {
    const formDataType = generateFormDataType(schema)

    let code = `import type React from "react"\n`
    code += `import { useState } from "react"\n\n`
    code += `${formDataType}\n`
    code += `export const ${schema.name}Form = () => {\n`
    code += "const [formData, setFormData] = useState<TFormData>({\n"

    schema.fields.forEach((field, index) => {
      const isLast = index === schema.fields.length - 1
      code += `${field.name}: ${JSON.stringify(getDefaultValue(field))}${isLast ? "" : ","}\n`
    })
    code += "})\n\n"

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
    code += `  return (\n`
    code += `    <form onSubmit={handleSubmit}>\n`
    code += `      ${inputsElements}\n`
    code += `      <button type="submit">Submit</button>\n`
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

  return { formStringComponent }
}
