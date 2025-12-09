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
    case "password":
    case "email":
    case "url":
    case "tel":
    case "search":
    case "date":
    case "datetime-local":
    case "time":
    case "month":
    case "week":
    case "color":
    case "datalist":
    case "output":
      return "string"
    case "number":
    case "range":
    case "progress":
    case "meter":
      return "number"
    case "checkbox":
      return "boolean"
    case "radio":
      return "string | number | boolean"
    case "file":
      return "File | null"
    case "select-multiple":
      return "string[]"
    default:
      return "any"
  }
}
