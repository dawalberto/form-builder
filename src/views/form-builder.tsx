import * as parserBabel from "prettier/plugins/babel"
import * as parserEstree from "prettier/plugins/estree"
import * as parserHtml from "prettier/plugins/html"
import * as prettier from "prettier/standalone"
import { useEffect, useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { CopyToClipboardButton } from "../components/coppy-to-clipboard-button"

type FormField = {
  _id: string
  type: React.HTMLInputTypeAttribute
  label: string
  value: any
  clearValue?: any
  items?: { label: string; value: any }[]
}

export const FormBuilder = ({
  schemaName,
  schema,
}: {
  schemaName: string
  schema: Record<string, FormField>
}) => {
  console.log("🦊 schema", schema)
  const [formStringComponent, setFormStringComponent] = useState<string>("")

  useEffect(() => {
    // 1️⃣ Construimos datos base
    const formData: Record<string, Omit<FormField, "_id" | "type">> = Object.entries(schema).reduce(
      (acc, [fieldKey, field]) => {
        acc[fieldKey] = {
          value: field.value,
          label: field.label,
          // type: field.type,
          ...(field.items ? { items: field.items } : {}),
          ...(field.clearValue !== undefined ? { clearValue: field.clearValue } : {}),
        }
        return acc
      },
      {} as Record<string, Omit<FormField, "_id" | "type">>,
    )

    console.log("🦊 formData", formData)

    // 2️⃣ Construimos el componente dinámico
    let code = `import React, { useState } from "react"\n\n`
    code += `export const ${schemaName}Form = () => {\n`
    code += `  const [formData, setFormData] = useState(${JSON.stringify(formData, null, 2)})\n\n`
    code += `  const handleChange = (key, e) => {\n`
    code += `    const { type, value, multiple, options } = e.target\n`
    code += `    let newValue\n`
    code += `    if (multiple) {\n`
    code += `      newValue = Array.from(options).filter(o => o.selected).map(o => o.value)\n`
    code += `    } else if (type === "radio") {\n`
    code += `      newValue = value === "true"\n`
    code += `    } else {\n`
    code += `      newValue = value\n`
    code += `    }\n`
    code += `    setFormData(prev => ({ ...prev, [key]: { ...prev[key], value: newValue } }))\n`
    code += `  }\n\n`

    code += `  const handleClear = () => {\n`
    code += `    setFormData(prev => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, { ...v, value: v.clearValue ?? "" }])))\n`
    code += `  }\n\n`

    code += `  const handleSubmit = (e) => {\n`
    code += `    e.preventDefault()\n`
    code += `    const result = Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, v.value]))\n`
    code += `    console.log(result)\n`
    code += `  }\n\n`

    code += `  return (\n`
    code += `    <form onSubmit={handleSubmit}>\n`

    Object.keys(schema).forEach((key) => {
      const field = schema[key]
      code += `      <div key="${key}">\n`
      code += `        <label>{formData["${key}"].label}</label>\n`

      if (field.type === "select-multiple") {
        code += `        <select multiple value={formData["${key}"].value} onChange={(e) => handleChange("${key}", e)}>\n`
        code += `          {formData["${key}"].items.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}\n`
        code += `        </select>\n`
      } else if (field.type === "radio") {
        code += `        {formData["${key}"].items.map(opt => (\n`
        code += `          <label key={opt.value}>\n`
        code += `            <input type="radio" name="${key}" value={opt.value} checked={formData["${key}"].value === opt.value} onChange={(e) => handleChange("${key}", e)} />\n`
        code += `            {opt.label}\n`
        code += `          </label>\n`
        code += `        ))}\n`
      } else {
        code += `        <input type={formData["${key}"].type} value={formData["${key}"].value} onChange={(e) => handleChange("${key}", e)} />\n`
      }

      code += `      </div>\n`
    })

    code += `      <button type="submit">Submit</button>\n`
    code += `      <button type="button" onClick={handleClear}>Clear</button>\n`
    code += `    </form>\n`
    code += `  )\n`
    code += `}\n`

    // 3️⃣ Formateamos el código con Prettier
    async function run() {
      try {
        const formatted = await prettier.format(code, {
          parser: "babel",
          plugins: [parserBabel, parserEstree, parserHtml] as any,
          semi: false,
          singleQuote: true,
        })
        setFormStringComponent(formatted)
      } catch (err) {
        console.error("‼️ Error formatting:", err)
        setFormStringComponent(code) // fallback
      }
    }
    run()
  }, [schemaName, schema])

  return (
    <div>
      <h2>Generated Form Component</h2>
      <div className="relative">
        <CopyToClipboardButton
          text={formStringComponent}
          ariaLabel="Copy generated form component code"
          className="absolute right-2 top-10"
        />
        <SyntaxHighlighter language="tsx" style={oneDark} showLineNumbers>
          {formStringComponent}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
