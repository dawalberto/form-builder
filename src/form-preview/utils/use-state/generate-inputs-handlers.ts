import {
  INPUT_CHECKBOX_HANDLER_NAME,
  INPUT_COMMON_HANDLER_NAME,
  INPUT_FILE_HANDLER_NAME,
  INPUT_NUMBER_HANDLER_NAME,
  INPUT_SELECT_MULTIPLE_HANDLER_NAME,
} from "@/form-preview/constants"

export const generateInputCommonHandler = (formSetStateName: string) => `
  const ${INPUT_COMMON_HANDLER_NAME} = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    ${formSetStateName}(prev => ({ ...prev, [name]: value }))
  }
  `

export const generateInputNumberHandler = (formSetStateName: string) => `
  const ${INPUT_NUMBER_HANDLER_NAME} = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = value === "" ? "" : Number(value)
    ${formSetStateName}(prev => ({ ...prev, [name]: numericValue }))
  }
  `

export const generateCheckboxHandler = (formSetStateName: string) => `
  const ${INPUT_CHECKBOX_HANDLER_NAME} = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    ${formSetStateName}(prev => ({ ...prev, [name]: checked }))
  }
  `

export const generateFileHandler = (formSetStateName: string) => `
  const ${INPUT_FILE_HANDLER_NAME} = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    ${formSetStateName}(prev => ({ ...prev, [name]: files?.[0] || null }))
  }
  `

export const generateSelectMultipleHandler = (formSetStateName: string) => `
  const ${INPUT_SELECT_MULTIPLE_HANDLER_NAME} = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target
    const selectedValues = Array.from(options).filter(o => o.selected).map(o => o.value)
    ${formSetStateName}(prev => ({ ...prev, [name]: selectedValues }))
  }
  `
