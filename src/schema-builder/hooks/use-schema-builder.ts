import { useCallback, useEffect, useState } from "react"
import type { ZodError } from "zod"
import { useStickyState } from "@/hooks"
import type { TFormSchemaType } from "../models"
import { FormSchema } from "../validations"

export const useSchemaBuilder = () => {
  const [schemaJSON, setSchemaJSON] = useStickyState<string>("", "schema-builder-schema-json")
  const [schema, setSchema] = useState<TFormSchemaType | null>(null)
  const [validations, setValidations] = useState<{
    validJSON: boolean | null
    fieldsErrors: ZodError[] | null
  }>({ validJSON: null, fieldsErrors: null })

  const validateSchema = useCallback((jsonString: string) => {
    // Empty textarea case
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
    console.log("💣🚨 schemaJSON")
    validateSchema(schemaJSON)
  }, [])

  return {
    schema,
    schemaJSON,
    validations,
    handleOnSchemaChange,
  }
}
