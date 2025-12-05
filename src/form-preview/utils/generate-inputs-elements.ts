import type { TFormFieldSchemaType } from "@/schema-builder/models"
import { INPUTS_HANDLERS_NAMES } from "../constants"

export const generateInputTextElement = (field: TFormFieldSchemaType, handler: string): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="text"
    id="${field.id}"
    name="${field.name}"
    value={formData.${field.name}}
    onChange={${handler}}
    placeholder="${field.placeholder || ""}"
    className="input-text"
  />`
}

export const generateInputNumberElement = (
  field: TFormFieldSchemaType,
  handler: string,
): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <input
    type="number"
    id="${field.id}"
    name="${field.name}"
    value={formData.${field.name}}
    onChange={${handler}}
    placeholder="${field.placeholder || ""}"
    className="input-number"
  />`
}

export const generateInputRadioElement = (field: TFormFieldSchemaType, handler: string): string => {
  return (field.options || [])
    .map(
      (option) => `<label>
        <input
          type="radio"
          name="${field.name}"
          value="${option.value}"
          checked={formData.${field.name} === "${option.value}"}
          onChange={${handler}}
        />
        ${option.label}
      </label>`,
    )
    .join("\n")
}

export const generateInputCheckboxElement = (
  field: TFormFieldSchemaType,
  handler: string,
): string => {
  return `
  ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
  <input
  type="checkbox"
  id="${field.id}"
  name="${field.name}"
  checked={formData.${field.name}}
  onChange={${handler}}
  className="input-checkbox"
  />
  `
}

export const generateInputTextareaElement = (
  field: TFormFieldSchemaType,
  handler: string,
): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <textarea
    id="${field.id}"
    name="${field.name}"
    value={formData.${field.name}}
    onChange={${handler}}
    placeholder="${field.placeholder || ""}"
    className="input-textarea"
  />`
}

export const generateInputSelectElement = (
  field: TFormFieldSchemaType,
  handler: string,
): string => {
  return `
    ${field.label ? `<label htmlFor="${field.id}">${field.label}</label>` : ""}
    <select
    id="${field.id}"
    name="${field.name}"
    value={formData.${field.name}}
    onChange={${handler}}
    className="input-select"
  >
    ${(field.options || []).map((option) => `<option value="${option.value}">${option.label}</option>`).join("\n")}
  </select>`
}

export const generateInputElements = (field: TFormFieldSchemaType, handler: string): string => {
  switch (field.type) {
    case "text":
      return generateInputTextElement(field, handler)
    case "number":
      return generateInputNumberElement(field, handler)
    case "radio":
      return generateInputRadioElement(field, handler)
    case "checkbox":
      return generateInputCheckboxElement(field, handler)
    case "textarea":
      return generateInputTextareaElement(field, handler)
    case "select":
      return generateInputSelectElement(field, handler)
    default:
      return ""
  }
}
export const generateInputElementsList = (fields: TFormFieldSchemaType[]): string => {
  return fields
    .map((field) => generateInputElements(field, INPUTS_HANDLERS_NAMES[field.type]))
    .join("\n")
}
