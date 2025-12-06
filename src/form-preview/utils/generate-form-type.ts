import type { TFieldType, TFormSchemaType } from "@/schema-builder/models"

export const generateFormType = (typeName: string, schema: TFormSchemaType): string => {
  let typeString = `type ${typeName} = {\n`
  schema.fields.forEach((field) => {
    const fieldType = getTypeFromFieldType(field.type)
    typeString += `  ${field.name}: ${fieldType};\n`
  })
  typeString += "}\n"
  return typeString
}

const getTypeFromFieldType = (fieldType: TFieldType): string => {
  switch (fieldType) {
    case "text":
    case "textarea":
    case "select":
      return "string"
    case "number":
      return "number"
    case "checkbox":
      return "boolean"
    case "radio":
      return "string | number | boolean"
    default:
      return "any"
  }
}
