import type React from "react"
import { useState } from "react"

type TFormData = {
  age: number
  bio: string
  country: string
  company: string
  subscribe: boolean
  gender: string | number | boolean
}

export const PersonForm = () => {
  const [formData, setFormData] = useState<TFormData>({
    age: 18,
    bio: "",
    country: "es",
    company: "es",
    subscribe: false,
    gender: "m",
  })

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = value === "" ? "" : Number(value)
    setFormData((prev) => ({ ...prev, [name]: numericValue }))
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const booleanValue = value === "true"
    setFormData((prev) => ({ ...prev, [name]: booleanValue }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  )
}
