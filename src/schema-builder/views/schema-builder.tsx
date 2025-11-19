import { useStickyState } from "@/hooks"
import { FormPreview } from "@/views/form-preview"
import clsx from "clsx"
import { useCallback, useEffect, useState } from "react"
import type { ZodError } from "zod"
import type { TFormSchemaType } from "../models"
import { FormSchema } from "../validations"

export const SchemaBuilder = () => {
  const [schemaJSON, setSchemaJSON] = useStickyState<string>("", "schema-builder-schema-json")
  const [schema, setSchema] = useState<TFormSchemaType | null>(null)
  const [validations, setValidations] = useState<{
    validJSON: boolean | null
    fieldsErrors: ZodError[] | null
  }>({ validJSON: null, fieldsErrors: null })

  const validateSchema = useCallback((jsonString: string) => {
    if (!jsonString) {
      setSchema(null)
      setValidations({ validJSON: null, fieldsErrors: null })
      return
    }

    try {
      const schemaValidationResult = FormSchema.safeParse(JSON.parse(jsonString))

      if (!schemaValidationResult.success) {
        setValidations({
          validJSON: true,
          fieldsErrors: JSON.parse(schemaValidationResult.error.message),
        })
        return
      }

      setSchema(schemaValidationResult.data)
    } catch (error) {
      setValidations({ validJSON: false, fieldsErrors: null })
      console.error("Error parsing schema:", error)
      return
    }

    setValidations({ validJSON: true, fieldsErrors: null })
  }, [])

  const handleOnSchemaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      setSchemaJSON(value)
      validateSchema(value)
    },
    [setSchemaJSON, validateSchema],
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Must only run on mount if schemaJSON exists in localStorage>
  useEffect(() => {
    if (!schemaJSON) return
    validateSchema(schemaJSON)
  }, [])

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
              validations.fieldsErrors.map(({ name, message }) => (
                <li key={`${name}-${message}`}>{message}</li>
              ))}
          </ul>
        </div>
      </div>
      {validations.validJSON && validations.fieldsErrors === null && schema && (
        <div className="mt-8">
          <FormPreview schema={schema} />
        </div>
      )}
    </main>
  )
}
