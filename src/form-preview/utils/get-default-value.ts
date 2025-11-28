import type { TFieldType, TFieldValueType, TFormFieldSchemaType } from "@/schema-builder/models"

const FIELD_DEFAULT_VALUES: Record<TFieldType, TFieldValueType> = {
  text: "",
  number: 0,
  radio: "",
  select: "",
  checkbox: false,
  textarea: "",
}

export const getDefaultValue = (field: TFormFieldSchemaType): TFieldValueType => {
  if (field.defaultValue !== undefined) {
    return field.defaultValue
  }
  return FIELD_DEFAULT_VALUES[field.type]
}
