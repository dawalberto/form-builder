import type React from "react"
import { useState } from "react"

type TFormData = {
  name: string
  age: number
  bio: string
  country: string
  company: string
  subscribe: boolean
  gender: string | number | boolean
}

export const PersonForm = () => {
  const [formData, setFormData] = useState<TFormData>({
    name: "",
    age: 28,
    bio: "",
    country: "es",
    company: "es",
    subscribe: false,
    gender: "m",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = value === "" ? "" : Number(value)
    setFormData((prev) => ({ ...prev, [name]: numericValue }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter your name"
        className="input-text"
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleNumberChange}
        placeholder="Enter your age"
        className="input-number"
      />
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleInputChange}
        placeholder="Tell us about yourself"
        className="input-textarea"
      />
      <select
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        className="input-select"
      >
        <option value="es">Spain</option>
        <option value="us">USA</option>
        <option value="de">Germany</option>
      </select>
      <select
        name="company"
        value={formData.company}
        onChange={handleInputChange}
        className="input-select"
      >
        <option value="es">Spain</option>
        <option value="us">USA</option>
        <option value="de">Germany</option>
      </select>
      <input
        type="checkbox"
        name="subscribe"
        checked={formData.subscribe}
        onChange={handleCheckboxChange}
        className="input-checkbox"
      />
      <label>
        <input
          type="radio"
          name="gender"
          value="m"
          checked={formData.gender === "m"}
          onChange={handleInputChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="f"
          checked={formData.gender === "f"}
          onChange={handleInputChange}
        />
        Female
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
