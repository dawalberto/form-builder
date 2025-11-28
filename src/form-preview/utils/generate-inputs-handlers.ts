export const INPUT_COMMON_HANDLER_NAME = "handleInputChange"
export const INPUT_NUMBER_HANDLER_NAME = "handleNumberChange"
export const INPUT_CHECKBOX_HANDLER_NAME = "handleCheckboxChange"

export const generateInputCommonHandler = () => `
  const ${INPUT_COMMON_HANDLER_NAME} = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  `

export const generateInputNumberHandler = () => `
  const ${INPUT_NUMBER_HANDLER_NAME} = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = value === "" ? "" : Number(value)
    setFormData(prev => ({ ...prev, [name]: numericValue }))
  }
  `

export const generateCheckboxHandler = () => `
  const ${INPUT_CHECKBOX_HANDLER_NAME} = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }
  `

// export const generateSelectSingleHandler = () => `
//   const handleSelectSingleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }
//   `

// export const generateSelectMultipleHandler = () => `
//     const handleSelectMultipleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//       const { name, options } = e.target
//       const selectedValues = Array.from(options).filter(o => o.selected).map(o => o.value)
//       setFormData(prev => ({ ...prev, [name]: { ...prev[name], value: selectedValues } }))
//     }
//     `
