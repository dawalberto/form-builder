import type { TFieldType } from "@/schema-builder/models"
import {
  INPUT_CHECKBOX_HANDLER_NAME,
  INPUT_COMMON_HANDLER_NAME,
  INPUT_NUMBER_HANDLER_NAME,
} from "../utils"

export const FIELDS_TYPES_COUNT_INITIAL_VALUE: Record<TFieldType, number> = {
  text: 0,
  radio: 0,
  select: 0,
  number: 0,
  checkbox: 0,
  textarea: 0,
}

export const INPUTS_HANDLERS_NAMES: Record<TFieldType, string> = {
  text: INPUT_COMMON_HANDLER_NAME,
  number: INPUT_NUMBER_HANDLER_NAME,
  radio: INPUT_COMMON_HANDLER_NAME,
  checkbox: INPUT_CHECKBOX_HANDLER_NAME,
  textarea: INPUT_COMMON_HANDLER_NAME,
  select: INPUT_COMMON_HANDLER_NAME,
}
