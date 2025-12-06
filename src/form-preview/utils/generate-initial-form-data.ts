import type { TFormSchemaType } from "@/schema-builder/models"
import { STRING_COMPONENT_NAMES } from "@/shared/constants"
import { getDefaultValue } from "./get-default-value"

export const generateInitialFormData = (schema: TFormSchemaType): string => {
  let code = `const ${STRING_COMPONENT_NAMES.FORM_INITIAL_DATA}: ${STRING_COMPONENT_NAMES.FORM_DATA_TYPE} = {\n`
  schema.fields.forEach((field, index) => {
    const isLast = index === schema.fields.length - 1
    code += `${field.name}: ${JSON.stringify(getDefaultValue(field))}${isLast ? "" : ","}\n`
  })
  code += "}"
  return code
}
