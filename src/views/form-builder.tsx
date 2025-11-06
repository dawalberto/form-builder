import { useState } from "react"
import { flattenObject } from "../utils/flatten-object"
import { schemaHasKeys } from "../utils/schema-has-keys"
import { schemaHasUniqueKeys } from "../utils/schema-has-unique-keys"

const SCHEMA_KEY = "_id"

export const FormBuilder = () => {
  const [formSchemaJSON, setFormSchemaJSON] = useState<string>("")
  const [formSchema, setFormSchema] = useState<object | null>(null)
  const [validations, setValidations] = useState<{
    validJSON: boolean | null
    validKeys: boolean | null
    validUniqueKeys?: boolean | null
    // TODO : Add validation for empty id keys ""
  }>({ validJSON: null, validKeys: null, validUniqueKeys: null })

  const handleOnFormSchemaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setFormSchemaJSON(value)

    if (!value) {
      setFormSchema(null)
      setValidations({ validJSON: null, validKeys: null, validUniqueKeys: null })
      return
    }

    try {
      const schema = JSON.parse(value)
      console.log("🦊 schema", schema)
      const flattenedSchema = flattenObject(schema)
      console.log("🦊 flattenedSchema", flattenedSchema)
      const validKeys = schemaHasKeys(flattenedSchema, SCHEMA_KEY)
      setValidations({ validJSON: true, validKeys, validUniqueKeys: null })
      if (!validKeys) {
        return
      }
      const validUniqueKeys = schemaHasUniqueKeys(flattenedSchema, SCHEMA_KEY)
      setValidations({ validJSON: true, validKeys, validUniqueKeys })
      if (!validUniqueKeys) {
        return
      }
      setFormSchema(flattenedSchema)
    } catch (error) {
      console.error("🦊 Error parsing JSON:", error)
      setValidations({ validJSON: false, validKeys: null, validUniqueKeys: null })
    }
  }

  return (
    <main className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="formSchemaJSON">Paste here your Form Schema in JSON format</label>
        <textarea
          id="formSchemaJSON"
          name="formSchemaJSON"
          value={formSchemaJSON}
          onChange={handleOnFormSchemaChange}
          className="border w-full min-h-96 font-mono p-3 bg-stone-50 text-stone-700"
        />
        <div className="flex flex-col gap-1">
          <p>Validations:</p>
          {validations.validJSON !== null && (
            <span>{validations.validJSON ? "✅ Valid JSON" : "❌ Invalid JSON"}</span>
          )}
          {validations.validKeys !== null && (
            <span>
              {validations.validKeys
                ? "✅ Valid Keys"
                : "❌ Some object is missing the SCHEMA_KEY key"}
            </span>
          )}
          {validations.validUniqueKeys !== null && (
            <span>
              {validations.validUniqueKeys
                ? "✅ All _id keys are unique"
                : "❌ There are duplicated SCHEMA_KEY keys"}
            </span>
          )}
        </div>
      </div>
    </main>
  )
}
