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
