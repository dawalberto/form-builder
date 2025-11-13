import clsx from "clsx"
import { useState } from "react"
import type { ZodError } from "zod"
import { FormSchema } from "../validations/schema-validation"
import { FormBuilder } from "./form-builder"

export const SchemaBuilder = () => {
  const [schemaJSON, setSchemaJSON] = useState<string>("")
  const [schema, setSchema] = useState<object | null>(null)
  const [validations, setValidations] = useState<{
    validJSON: boolean | null
    fieldsErrors: ZodError[] | null
  }>({ validJSON: null, fieldsErrors: null })

  const handleOnSchemaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setSchemaJSON(value)

    if (!value) {
      setSchema(null)
      setValidations({ validJSON: null, fieldsErrors: null })
      return
    }

    try {
      const schemaValidationResult = FormSchema.safeParse(JSON.parse(value))

      if (!schemaValidationResult.success) {
        setValidations({
          validJSON: true,
          fieldsErrors: JSON.parse(schemaValidationResult.error.message),
        })
        return
      }
    } catch (error) {
      setValidations({ validJSON: false, fieldsErrors: null })
      console.error("Error parsing schema:", error)
      return
    }

    setValidations({ validJSON: true, fieldsErrors: null })
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
        <div
          className={clsx(
            "flex flex-col gap-1",
            (validations.validJSON === true || validations.validJSON === null) &&
              validations.fieldsErrors === null
              ? "hidden"
              : "block",
          )}
        >
          <span>❌ Schema Errors:</span>
          <ul className="list-disc list-inside">
            {validations.validJSON === false && <li>❌ Invalid JSON</li>}
            {validations.fieldsErrors &&
              validations.fieldsErrors.length > 0 &&
              validations.fieldsErrors.map((error, index) => <li key={index}>{error.message}</li>)}
          </ul>
        </div>
      </div>
      {Object.values(validations).every((v) => v === true) && (
        <div className="mt-8">
          <FormBuilder schemaName="Generated" schema={schema as any} />
        </div>
      )}
    </main>
  )
}
