import parserBabel from "prettier/plugins/babel"
import parserEstree from "prettier/plugins/estree"
import parserHtml from "prettier/plugins/html"
import parserTypeScript from "prettier/plugins/typescript"
import prettier from "prettier/standalone"
import type { TFormSchemaType } from "@/schema-builder/models"
import { generateFormType, generateInputElementsList, getFieldsTypesCount } from "../utils"
import {
  generateCheckboxHandler,
  generateInitialFormData,
  generateInputCommonHandler,
  generateInputNumberHandler,
} from "../utils/use-state"

export class FormStringBuilder {
  private readonly schema: TFormSchemaType
  public readonly formName: string
  private readonly formTypeName: string
  private readonly initialFormDataName: string
  private readonly formStateName: string
  private readonly formSetStateName: string

  constructor(schema: TFormSchemaType) {
    this.schema = schema
    const formNameRaw = schema.name
    this.formName = formNameRaw.charAt(0).toUpperCase() + formNameRaw.slice(1)
    this.formTypeName = `T${this.formName}Form`
    this.initialFormDataName = `initial${this.formName}Data`
    this.formStateName = `${this.formName.charAt(0).toLowerCase() + this.formName.slice(1)}Data`
    this.formSetStateName = `set${this.formName}Data`
  }

  private buildCodeString() {
    const fieldsTypesCount = getFieldsTypesCount(this.schema)
    const inputsElements = generateInputElementsList({
      fields: this.schema.fields,
      formStateName: this.formStateName,
    })

    const formType = generateFormType(this.formTypeName, this.schema)
    const formInitialData = generateInitialFormData({
      constName: this.initialFormDataName,
      typeName: this.formTypeName,
      schema: this.schema,
    })

    let code = `import type React from "react"\n`
    code += `import { useState } from "react"\n\n`
    code += `${formType}\n`
    code += `${formInitialData}\n\n`
    code += `export const ${this.schema.name}Form = () => {\n`
    code += `  const [${this.formStateName}, ${this.formSetStateName}] = useState<${this.formTypeName}>(${this.initialFormDataName})\n`

    if (
      fieldsTypesCount.text > 0 ||
      fieldsTypesCount.radio > 0 ||
      fieldsTypesCount.select > 0 ||
      fieldsTypesCount.textarea > 0
    ) {
      code += `  ${generateInputCommonHandler(this.formSetStateName)}\n`
    }

    if (fieldsTypesCount.number > 0) {
      code += `  ${generateInputNumberHandler(this.formSetStateName)}\n`
    }

    if (fieldsTypesCount.checkbox > 0) {
      code += `  ${generateCheckboxHandler(this.formSetStateName)}\n`
    }

    code += `
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(${this.formStateName})
      }

      const handleReset = (e: React.FormEvent) => {
        e.preventDefault()
        ${this.formSetStateName}(${this.initialFormDataName})
      }

      return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
          ${inputsElements}
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      )
    }
`

    return code
  }

  async build() {
    const code = this.buildCodeString()

    try {
      const formatted = await prettier.format(code, {
        parser: "babel-ts",
        plugins: [parserBabel, parserEstree, parserHtml, parserTypeScript],
        semi: false,
        singleQuote: true,
        printWidth: 90,
      })

      return formatted
    } catch {
      return code
    }
  }
}
