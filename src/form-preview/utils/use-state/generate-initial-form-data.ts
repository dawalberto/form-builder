import type { TFormSchemaType } from "@/schema-builder/models"
import { getDefaultValueOfField } from "../get-default-value-of-field"

export const generateInitialFormData = ({
  constName,
  typeName,
  schema,
}: {
  constName: string
  typeName: string
  schema: TFormSchemaType
}): string => {
  let code = `const ${constName}: ${typeName} = {\n`
  schema.fields.forEach((field, index) => {
    const isLast = index === schema.fields.length - 1
    code += `${field.name}: ${JSON.stringify(getDefaultValueOfField(field))}${isLast ? "" : ","}\n`
  })
  code += "}"
  return code
}
