import React, { useState } from "react"

type FormField = {
  _id: string
  type: string
  label: string
  value: any
  clearValue?: any
  items?: { label: string; value: any }[]
}

type FormSchema = Record<string, FormField>

const initialSchema: FormSchema = {
  firstName: {
    _id: "firstName",
    type: "string",
    label: "First Name",
    value: "",
    clearValue: "",
  },
  hobby: {
    _id: "hobby",
    type: "select-multiple",
    label: "Hobby",
    items: [
      { label: "Reading", value: "reading" },
      { label: "Traveling", value: "traveling" },
      { label: "Cooking", value: "cooking" },
    ],
    value: ["reading"],
    clearValue: [],
  },
  name: {
    _id: "dogName",
    type: "string",
    label: "Dog Name",
    value: "Hippie",
    clearValue: "",
  },
  has: {
    _id: "hasCat",
    type: "radio",
    label: "Has a Cat",
    items: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
    value: true,
    clearValue: null,
  },
}

export const DynamicForm = () => {
  const [formData, setFormData] = useState<FormSchema>(initialSchema)

  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { type, value, checked, multiple, options } = e.target as any
    let newValue: any

    if (type === "radio") {
      newValue = value === "true"
    } else if (multiple) {
      newValue = Array.from(options)
        .filter((o: any) => o.selected)
        .map((o: any) => o.value)
    } else {
      newValue = value
    }

    setFormData((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: newValue },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, v.value]))
    console.log(result)
  }

  const handleClear = () => {
    setFormData((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([k, v]) => [k, { ...v, value: v.clearValue ?? "" }]),
      ),
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow">
      {Object.entries(formData).map(([key, field]) => (
        <div key={field._id} className="mb-4">
          <label className="block text-sm font-medium mb-1">{field.label}</label>

          {field.type === "string" && (
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleChange(key, e)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
            />
          )}

          {field.type === "select-multiple" && (
            <select
              multiple
              value={field.value}
              onChange={(e) => handleChange(key, e)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
            >
              {field.items?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {field.type === "radio" &&
            field.items?.map((opt) => (
              <label key={opt.label} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={key}
                  value={String(opt.value)}
                  checked={field.value === opt.value}
                  onChange={(e) => handleChange(key, e)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 bg-gray-200 text-gray-800 rounded-lg py-2 hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
    </form>
  )
}
