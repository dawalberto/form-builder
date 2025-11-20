export const generateCommonInputHandler = () => `
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  `

export const generateInputNumberHandler = () => `
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = value === "" ? "" : Number(value)
    setFormData(prev => ({ ...prev, [name]: numericValue }))
  }
  `

// export const generateSelectMultipleHandler = () => `
//     const handleSelectMultipleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//       const { name, options } = e.target
//       const selectedValues = Array.from(options).filter(o => o.selected).map(o => o.value)
//       setFormData(prev => ({ ...prev, [name]: { ...prev[name], value: selectedValues } }))
//     }
//     `

export const generateRadioHandler = () => `
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const booleanValue = value === "true"
    setFormData(prev => ({ ...prev, [name]: booleanValue }))
  }
  `
