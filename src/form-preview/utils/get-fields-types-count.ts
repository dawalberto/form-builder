import type { TFormSchemaType } from "@/schema-builder/models"
import { FIELDS_TYPES_COUNT_INITIAL_VALUE } from "../constants"

export const getFieldsTypesCount = (schema: TFormSchemaType) => {
  const typesCount = { ...FIELDS_TYPES_COUNT_INITIAL_VALUE }
  Object.values(schema?.fields || {}).forEach(({ type }) => {
    typesCount[type] = (typesCount[type] || 0) + 1
  })
  return typesCount
}
