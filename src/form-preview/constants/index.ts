import type { TFieldType } from "@/schema-builder/models"

export const INPUT_COMMON_HANDLER_NAME = "handleInputChange"
export const INPUT_NUMBER_HANDLER_NAME = "handleNumberChange"
export const INPUT_CHECKBOX_HANDLER_NAME = "handleCheckboxChange"
export const INPUT_FILE_HANDLER_NAME = "handleFileChange"
export const INPUT_SELECT_MULTIPLE_HANDLER_NAME = "handleSelectMultipleChange"

export const FIELDS_TYPES_COUNT_INITIAL_VALUE: Record<TFieldType, number> = {
  text: 0,
  radio: 0,
  select: 0,
  number: 0,
  checkbox: 0,
  textarea: 0,
  password: 0,
  email: 0,
  url: 0,
  tel: 0,
  search: 0,
  date: 0,
  "datetime-local": 0,
  time: 0,
  month: 0,
  week: 0,
  range: 0,
  color: 0,
  file: 0,
  datalist: 0,
  progress: 0,
  meter: 0,
  output: 0,
  "select-multiple": 0,
}

export const INPUTS_HANDLERS_NAMES: Record<TFieldType, string> = {
  text: INPUT_COMMON_HANDLER_NAME,
  number: INPUT_NUMBER_HANDLER_NAME,
  radio: INPUT_COMMON_HANDLER_NAME,
  checkbox: INPUT_CHECKBOX_HANDLER_NAME,
  textarea: INPUT_COMMON_HANDLER_NAME,
  select: INPUT_COMMON_HANDLER_NAME,
  password: INPUT_COMMON_HANDLER_NAME,
  email: INPUT_COMMON_HANDLER_NAME,
  url: INPUT_COMMON_HANDLER_NAME,
  tel: INPUT_COMMON_HANDLER_NAME,
  search: INPUT_COMMON_HANDLER_NAME,
  date: INPUT_COMMON_HANDLER_NAME,
  "datetime-local": INPUT_COMMON_HANDLER_NAME,
  time: INPUT_COMMON_HANDLER_NAME,
  month: INPUT_COMMON_HANDLER_NAME,
  week: INPUT_COMMON_HANDLER_NAME,
  range: INPUT_NUMBER_HANDLER_NAME,
  color: INPUT_COMMON_HANDLER_NAME,
  file: INPUT_FILE_HANDLER_NAME,
  datalist: INPUT_COMMON_HANDLER_NAME,
  progress: INPUT_NUMBER_HANDLER_NAME,
  meter: INPUT_NUMBER_HANDLER_NAME,
  output: INPUT_COMMON_HANDLER_NAME,
  "select-multiple": INPUT_SELECT_MULTIPLE_HANDLER_NAME,
}
