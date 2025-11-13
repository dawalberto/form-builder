export type FormSchema = {
  fields: FormField[]
}

export type FormField = {
  id: string
  name: string
  label?: string
  type: "text" | "number" | "textarea" | "select" | "checkbox" | "radio"

  defaultValue?: any
  placeholder?: string
  required?: boolean

  options?: Array<{
    label: string
    value: string | number
  }>
}
