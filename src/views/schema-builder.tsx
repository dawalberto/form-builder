import { useState } from "react"
import { flattenObject } from "../utils/flatten-object"
import { schemaHasKeys } from "../utils/schema-has-keys"
import { schemaHasUniqueKeys } from "../utils/schema-has-unique-keys"

const SCHEMA_KEY = "_id"

export const SchemaBuilder = () => {
  const [schemaJSON, setSchemaJSON] = useState<string>("")
  const [schema, setSchema] = useState<object | null>(null)
  const [validations, setValidations] = useState<{
    validJSON: boolean | null
    validKeys: boolean | null
    validUniqueKeys?: boolean | null
    // TODO - Add validation for empty id keys ""
    // TODO - Add validation for input types
  }>({ validJSON: null, validKeys: null, validUniqueKeys: null })

  const handleOnSchemaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setSchemaJSON(value)

    if (!value) {
      setSchema(null)
      setValidations({ validJSON: null, validKeys: null, validUniqueKeys: null })
      return
    }

    try {
      const schema = JSON.parse(value)
      const flattenedSchema = flattenObject(schema)
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

      console.log("🦊 flattenedSchema", flattenedSchema)
      setSchema(flattenedSchema)
    } catch {
      setValidations({ validJSON: false, validKeys: null, validUniqueKeys: null })
    }
  }

  return (
    <main className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="schemaJSON">Paste here your Form Schema in JSON format</label>
        <textarea
          id="schemaJSON"
          name="schemaJSON"
          value={schemaJSON}
          onChange={handleOnSchemaChange}
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
