import type React from "react"
import { useState } from "react"

type TFormNameForm = {
  text_1: string
  email_1: string
  password_1: string
  url_1: string
  tel_1: string
  search_1: string
  textarea_1: string
  number_1: number
  range_1: number
  date_1: string
  datetime_local_1: string
  time_1: string
  month_1: string
  week_1: string
  checkbox_1: boolean
  radio_1: string | number | boolean
  select_1: string
  select_multiple_1: string[]
  datalist_1: string
  color_1: string
  file_1: File | null
  datalist_2: string
}

const initialFormNameData: TFormNameForm = {
  text_1: "",
  email_1: "",
  password_1: "",
  url_1: "",
  tel_1: "",
  search_1: "",
  textarea_1: "",
  number_1: 9999,
  range_1: 0,
  date_1: "",
  datetime_local_1: "",
  time_1: "",
  month_1: "",
  week_1: "",
  checkbox_1: false,
  radio_1: "",
  select_1: "",
  select_multiple_1: [],
  datalist_1: "",
  color_1: "#000000",
  file_1: null,
  datalist_2: "",
}

export const FormNameForm = () => {
  const [formNameData, setFormNameData] = useState<TFormNameForm>(initialFormNameData)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormNameData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = value === "" ? "" : Number(value)
    setFormNameData((prev) => ({ ...prev, [name]: numericValue }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormNameData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    setFormNameData((prev) => ({ ...prev, [name]: files?.[0] || null }))
  }

  const handleSelectMultipleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target
    const selectedValues = Array.from(options)
      .filter((o) => o.selected)
      .map((o) => o.value)
    setFormNameData((prev) => ({ ...prev, [name]: selectedValues }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formNameData)
  }

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    setFormNameData(initialFormNameData)
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <label htmlFor="text_1">Text Field test</label>
      <input
        type="text"
        id="text_1"
        name="text_1"
        value={formNameData.text_1}
        onChange={handleInputChange}
        placeholder="Enter text..."
      />

      <label htmlFor="email_1">Email Address</label>
      <input
        type="email"
        id="email_1"
        name="email_1"
        value={formNameData.email_1}
        onChange={handleInputChange}
        placeholder="your@email.com"
      />

      <label htmlFor="password_1">Password</label>
      <input
        type="password"
        id="password_1"
        name="password_1"
        value={formNameData.password_1}
        onChange={handleInputChange}
        placeholder="Enter password..."
      />

      <label htmlFor="url_1">URL</label>
      <input
        type="url"
        id="url_1"
        name="url_1"
        value={formNameData.url_1}
        onChange={handleInputChange}
        placeholder="https://example.com"
      />

      <label htmlFor="tel_1">Phone Number</label>
      <input
        type="tel"
        id="tel_1"
        name="tel_1"
        value={formNameData.tel_1}
        onChange={handleInputChange}
        placeholder="+1 (555) 000-0000"
      />

      <label htmlFor="search_1">Search Field</label>
      <input
        type="search"
        id="search_1"
        name="search_1"
        value={formNameData.search_1}
        onChange={handleInputChange}
        placeholder="Search..."
      />

      <label htmlFor="textarea_1">Text Area tttt</label>
      <textarea
        id="textarea_1"
        name="textarea_1"
        value={formNameData.textarea_1}
        onChange={handleInputChange}
        placeholder="Enter long text..."
      />

      <label htmlFor="number_1">Number 1</label>
      <input
        type="number"
        id="number_1"
        name="number_1"
        value={formNameData.number_1}
        onChange={handleNumberChange}
        placeholder="😮0"
      />

      <label htmlFor="range_1">Range Slider</label>
      <input
        type="range"
        id="range_1"
        name="range_1"
        value={formNameData.range_1}
        onChange={handleNumberChange}
      />

      <label htmlFor="date_1">Date Picker</label>
      <input
        type="date"
        id="date_1"
        name="date_1"
        value={formNameData.date_1}
        onChange={handleInputChange}
      />

      <label htmlFor="datetime_local_1">Date & Time</label>
      <input
        type="datetime-local"
        id="datetime_local_1"
        name="datetime_local_1"
        value={formNameData.datetime_local_1}
        onChange={handleInputChange}
      />

      <label htmlFor="time_1">Time Picker</label>
      <input
        type="time"
        id="time_1"
        name="time_1"
        value={formNameData.time_1}
        onChange={handleInputChange}
      />

      <label htmlFor="month_1">Month Picker</label>
      <input
        type="month"
        id="month_1"
        name="month_1"
        value={formNameData.month_1}
        onChange={handleInputChange}
      />

      <label htmlFor="week_1">Week Picker</label>
      <input
        type="week"
        id="week_1"
        name="week_1"
        value={formNameData.week_1}
        onChange={handleInputChange}
      />

      <label htmlFor="checkbox_1">Checkbox</label>
      <input
        type="checkbox"
        id="checkbox_1"
        name="checkbox_1"
        checked={formNameData.checkbox_1}
        onChange={handleCheckboxChange}
      />

      <label>
        <input
          type="radio"
          name="radio_1"
          value="option1"
          checked={formNameData.radio_1 === "option1"}
          onChange={handleInputChange}
        />
        Option 1
      </label>
      <label>
        <input
          type="radio"
          name="radio_1"
          value="option2"
          checked={formNameData.radio_1 === "option2"}
          onChange={handleInputChange}
        />
        Option 2
      </label>
      <label>
        <input
          type="radio"
          name="radio_1"
          value="option3"
          checked={formNameData.radio_1 === "option3"}
          onChange={handleInputChange}
        />
        Option 3
      </label>

      <label htmlFor="select_1">Dropdown</label>
      <select
        id="select_1"
        name="select_1"
        value={formNameData.select_1}
        onChange={handleInputChange}
      >
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>

      <label htmlFor="select_multiple_1">Multi-select</label>
      <select
        id="select_multiple_1"
        name="select_multiple_1"
        value={formNameData.select_multiple_1}
        onChange={handleSelectMultipleChange}
        multiple
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <label htmlFor="datalist_1">Datalist</label>
      <input
        type="text"
        id="datalist_1"
        name="datalist_1"
        value={formNameData.datalist_1}
        onChange={handleInputChange}
        list="datalist_1-datalist"
        placeholder="Type or select..."
      />
      <datalist id="datalist_1-datalist">
        <option value="suggestion1">Suggestion 1</option>
        <option value="suggestion2">Suggestion 2</option>
        <option value="suggestion3">Suggestion 3</option>
      </datalist>

      <label htmlFor="color_1">Color Picker</label>
      <input
        type="color"
        id="color_1"
        name="color_1"
        value={formNameData.color_1}
        onChange={handleInputChange}
      />

      <label htmlFor="file_1">File Upload</label>
      <input type="file" id="file_1" name="file_1" onChange={handleFileChange} />

      <label htmlFor="datalist_2">Datalist</label>
      <input
        type="text"
        id="datalist_2"
        name="datalist_2"
        value={formNameData.datalist_2}
        onChange={handleInputChange}
        list="datalist_2-datalist"
        placeholder="Type or select..."
      />
      <datalist id="datalist_2-datalist">
        <option value="suggestion1">Suggestion 1</option>
        <option value="suggestion2">Suggestion 2</option>
        <option value="suggestion3">Suggestion 3</option>
      </datalist>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  )
}
