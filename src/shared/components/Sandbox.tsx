import type React from "react"
import { useState } from "react"

type TSuperHeroForm = {
  name: string
  age: number
  bio: string
  country: string
  subscribe: boolean
  gender: string | number | boolean
}

const initialSuperHeroData: TSuperHeroForm = {
  name: "Spiderman",
  age: 16,
  bio: "",
  country: "us",
  subscribe: false,
  gender: "m",
}

export const SuperHeroForm = () => {
  const [superHeroData, setSuperHeroData] = useState<TSuperHeroForm>(initialSuperHeroData)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setSuperHeroData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = value === "" ? "" : Number(value)
    setSuperHeroData((prev) => ({ ...prev, [name]: numericValue }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setSuperHeroData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(superHeroData)
  }

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    setSuperHeroData(initialSuperHeroData)
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={superHeroData.name}
        onChange={handleInputChange}
        placeholder="Super hero name"
      />

      <label htmlFor="age">Age</label>
      <input
        type="number"
        id="age"
        name="age"
        value={superHeroData.age}
        onChange={handleNumberChange}
      />

      <label htmlFor="bio">Biography</label>
      <textarea
        id="bio"
        name="bio"
        value={superHeroData.bio}
        onChange={handleInputChange}
        placeholder="Tell us about the super hero"
      />

      <label htmlFor="country">Country</label>
      <select
        id="country"
        name="country"
        value={superHeroData.country}
        onChange={handleInputChange}
      >
        <option value="es">Spain</option>
        <option value="us">USA</option>
        <option value="de">Germany</option>
      </select>

      <label htmlFor="subscribe">Immortal</label>
      <input
        type="checkbox"
        id="subscribe"
        name="subscribe"
        checked={superHeroData.subscribe}
        onChange={handleCheckboxChange}
      />

      <label>
        <input
          type="radio"
          name="gender"
          value="m"
          checked={superHeroData.gender === "m"}
          onChange={handleInputChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="f"
          checked={superHeroData.gender === "f"}
          onChange={handleInputChange}
        />
        Female
      </label>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  )
}
