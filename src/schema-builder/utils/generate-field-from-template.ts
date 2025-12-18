import { FIELD_GROUPS } from "../constants"
import type { TFieldType, TFormFieldSchemaType, TFormSchemaType } from "../models"

export const generateFieldFromTemplate = (
  type: TFieldType,
  existingSchema: TFormSchemaType | null,
): TFormFieldSchemaType => {
  const template = Object.values(FIELD_GROUPS)
    .flat()
    .find((t) => t.type === type)

  if (!template) {
    throw new Error(`Template not found for type: ${type}`)
  }

  const existingFieldsOfType = existingSchema?.fields.filter((f) => f.type === type) || []
  const nextNumber = existingFieldsOfType.length + 1

  const fieldId = `${type.replace("-", "_")}_${nextNumber}`
  const fieldName = `${type.replace("-", "_")}_${nextNumber}`

  const newField: TFormFieldSchemaType = {
    id: fieldId,
    name: fieldName,
    type: template.type,
    label: template.label,
    required: false,
    class: "",
    defaultValue: template.defaultValue,
  }

  if (template.placeholder !== undefined) {
    newField.placeholder = template.placeholder
  }

  if (template.options !== undefined) {
    newField.options = template.options
  }

  return newField
}

export const addFieldToSchema = (
  type: TFieldType,
  existingSchema: TFormSchemaType | null,
): TFormSchemaType => {
  const newField = generateFieldFromTemplate(type, existingSchema)

  if (!existingSchema) {
    return {
      name: "FormName",
      fields: [newField],
    }
  }

  return {
    ...existingSchema,
    fields: [...existingSchema.fields, newField],
  }
}
