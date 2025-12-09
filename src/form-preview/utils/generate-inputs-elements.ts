import type { TFormFieldSchemaType } from "@/schema-builder/models"
import { INPUTS_HANDLERS_NAMES } from "../constants"

type TGenerateInputElementsParams = {
  field: TFormFieldSchemaType
  handler: string
  formStateName: string
}

const generateInputTextElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="text"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputNumberElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="number"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputRadioElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return (field.options || [])
    .map(
      (option) => `<label>
        <input
          type="radio"
          name="${field.name}"
          value="${option.value}"
          checked={${formStateName}.${field.name} === "${option.value}"}
          onChange={${handler}}
          ${field.class ? `className="${field.class}"` : ""}
        />
        ${option.label}
      </label>`,
    )
    .join("\n")
}

const generateInputCheckboxElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
  ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
  <input
  type="checkbox"
  id="${field.id}"
  name="${field.name}"
  checked={${formStateName}.${field.name}}
  onChange={${handler}}
  ${field.class ? `className="${field.class}"` : ""}
  />
  `
}

const generateInputTextareaElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <textarea
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    placeholder="${field.placeholder || ""}"
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputSelectElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <select
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.class ? `className="${field.class}"` : ""}
  >
    ${(field.options || []).map((option) => `<option value="${option.value}">${option.label}</option>`).join("\n")}
  </select>`
}

const generateInputPasswordElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="password"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputEmailElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="email"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputUrlElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="url"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputTelElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="tel"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputSearchElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="search"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputDateElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="date"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputDatetimeLocalElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="datetime-local"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputTimeElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="time"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputMonthElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="month"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputWeekElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="week"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputRangeElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="range"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputColorElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="color"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputFileElement = ({ field, handler }: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="file"
    id="${field.id}"
    name="${field.name}"
    onChange={${handler}}
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputDatalistElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  const datalistId = `${field.id}-datalist`
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="text"
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    list="${datalistId}"
    ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
    ${field.class ? `className="${field.class}"` : ""}
  />
  <datalist id="${datalistId}">
    ${(field.options || []).map((option) => `<option value="${option.value}">${option.label}</option>`).join("\n")}
  </datalist>`
}

const generateInputProgressElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <progress
    id="${field.id}"
    value={${formStateName}.${field.name}}
    max="100"
    ${field.class ? `className="${field.class}"` : ""}
  />
  <input
    type="number"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    min="0"
    max="100"
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputMeterElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <meter
    id="${field.id}"
    value={${formStateName}.${field.name}}
    min="0"
    max="100"
    ${field.class ? `className="${field.class}"` : ""}
  />
  <input
    type="number"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    min="0"
    max="100"
    ${field.class ? `className="${field.class}"` : ""}
  />`
}

const generateInputOutputElement = ({
  field,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <output
    id="${field.id}"
    name="${field.name}"
    ${field.class ? `className="${field.class}"` : ""}
  >{${formStateName}.${field.name}}</output>`
}

const generateInputSelectMultipleElement = ({
  field,
  handler,
  formStateName,
}: TGenerateInputElementsParams): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <select
    id="${field.id}"
    name="${field.name}"
    value={${formStateName}.${field.name}}
    onChange={${handler}}
    multiple
    ${field.class ? `className="${field.class}"` : ""}
  >
    ${(field.options || []).map((option) => `<option value="${option.value}">${option.label}</option>`).join("\n")}
  </select>`
}

const generateInputElements = ({
  field,
  handler,
  formStateName,
}: {
  field: TFormFieldSchemaType
  handler: string
  formStateName: string
}): string => {
  switch (field.type) {
    case "text":
      return generateInputTextElement({ field, handler, formStateName })
    case "number":
      return generateInputNumberElement({ field, handler, formStateName })
    case "radio":
      return generateInputRadioElement({ field, handler, formStateName })
    case "checkbox":
      return generateInputCheckboxElement({ field, handler, formStateName })
    case "textarea":
      return generateInputTextareaElement({ field, handler, formStateName })
    case "select":
      return generateInputSelectElement({ field, handler, formStateName })
    case "password":
      return generateInputPasswordElement({ field, handler, formStateName })
    case "email":
      return generateInputEmailElement({ field, handler, formStateName })
    case "url":
      return generateInputUrlElement({ field, handler, formStateName })
    case "tel":
      return generateInputTelElement({ field, handler, formStateName })
    case "search":
      return generateInputSearchElement({ field, handler, formStateName })
    case "date":
      return generateInputDateElement({ field, handler, formStateName })
    case "datetime-local":
      return generateInputDatetimeLocalElement({ field, handler, formStateName })
    case "time":
      return generateInputTimeElement({ field, handler, formStateName })
    case "month":
      return generateInputMonthElement({ field, handler, formStateName })
    case "week":
      return generateInputWeekElement({ field, handler, formStateName })
    case "range":
      return generateInputRangeElement({ field, handler, formStateName })
    case "color":
      return generateInputColorElement({ field, handler, formStateName })
    case "file":
      return generateInputFileElement({ field, handler, formStateName })
    case "datalist":
      return generateInputDatalistElement({ field, handler, formStateName })
    case "progress":
      return generateInputProgressElement({ field, handler, formStateName })
    case "meter":
      return generateInputMeterElement({ field, handler, formStateName })
    case "output":
      return generateInputOutputElement({ field, handler, formStateName })
    case "select-multiple":
      return generateInputSelectMultipleElement({ field, handler, formStateName })
    default:
      return ""
  }
}
export const generateInputElementsList = ({
  fields,
  formStateName,
}: {
  fields: TFormFieldSchemaType[]
  formStateName: string
}): string => {
  return fields
    .map((field) =>
      generateInputElements({ field, handler: INPUTS_HANDLERS_NAMES[field.type], formStateName }),
    )
    .join("\n")
}
