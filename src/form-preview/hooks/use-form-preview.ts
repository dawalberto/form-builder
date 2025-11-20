import * as parserBabel from "prettier/plugins/babel"
import * as parserEstree from "prettier/plugins/estree"
import * as parserHtml from "prettier/plugins/html"
import * as parserTypeScript from "prettier/plugins/typescript"
import * as prettier from "prettier/standalone"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { TFieldType, TFormSchemaType } from "@/schema-builder/models"
import {
  generateCommonInputHandler,
  generateFormDataType,
  generateInputNumberHandler,
  generateRadioHandler,
} from "../utils"

const FIELDS_TYPES_COUNT_INITIAL_VALUE: Record<TFieldType, number> = {
  text: 0,
  radio: 0,
  select: 0,
  number: 0,
  checkbox: 0,
  textarea: 0,
}

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

  const inputTextHandler = useMemo(() => {
    if (fieldsTypesCount.text < 1) return false
    return generateCommonInputHandler()
  }, [fieldsTypesCount.text])

  const inputNumberHandler = useMemo(() => {
    if (fieldsTypesCount.number < 1) return false
    return generateInputNumberHandler()
  }, [fieldsTypesCount.number])

  const radioHandler = useMemo(() => {
    if (fieldsTypesCount.radio < 1) return false
    return generateRadioHandler()
  }, [fieldsTypesCount.radio])

  const buildFormStringComponent = useCallback(() => {
    const formDataType = generateFormDataType(schema)
    let code = `import React, { useState } from "react"\n\n`

    code += `${formDataType}\n`

    code += `export const ${schema.name}Form = () => {\n`
    code += "  const [formData, setFormData] = useState<TFormData>({\n"

    schema.fields.forEach((field, index) => {
      const isLast = index === schema.fields.length - 1
      code += `    ${field.name}: ${JSON.stringify(field.defaultValue)}${isLast ? "" : ","}\n`
    })

    code += "  })\n\n"

    if (inputTextHandler) {
      code += `${inputTextHandler}\n`
    }
    if (inputNumberHandler) {
      code += `${inputNumberHandler}\n`
    }
    if (radioHandler) {
      code += `${radioHandler}\n`
    }
    code += `  const handleSubmit = (e: React.FormEvent) => {\n`
    code += `    e.preventDefault()\n`
    code += `    console.log(formData)\n`
    code += `  }\n\n`
    code += `  return (\n`
    code += `    <form onSubmit={handleSubmit}>\n`
    // ... aquí seguiría la generación del JSX del formulario ...
    code += `      <button type="submit">Submit</button>\n`
    code += `    </form>\n`
    code += `  )\n`
    code += `}\n`
    return code
  }, [schema, inputTextHandler, inputNumberHandler, radioHandler])

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
            parserTypeScript, // ADD THIS
          ] as any,
          semi: false,
          singleQuote: true,
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
