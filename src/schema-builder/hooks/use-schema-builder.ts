import { useCallback, useEffect, useMemo, useState } from "react"
import type { ZodError } from "zod"
import { useStickyState } from "@/hooks"
import { debounce } from "@/utils"
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
    console.log("💣🚨 validating")
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

  const debouncedValidate = useMemo(
    () => debounce((value: string) => validateSchema(value)),
    [validateSchema],
  )

  const handleOnSchemaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      setSchemaJSON(value)
      debouncedValidate(value)
    },
    [setSchemaJSON, debouncedValidate],
  )

  const handleOnSchemaBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      try {
        const parsed = JSON.parse(value)
        const formatted = JSON.stringify(parsed, null, 2)
        setSchemaJSON(formatted)
      } catch {
        // Do nothing if JSON is invalid
      }
    },
    [setSchemaJSON],
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Must only run on mount if schemaJSON exists in localStorage>
  useEffect(() => {
    if (!schemaJSON) return
    validateSchema(schemaJSON)
  }, [])

  useEffect(() => {
    return () => {
      debouncedValidate.cancel?.()
    }
  }, [debouncedValidate])

  return {
    schema,
    schemaJSON,
    validations,
    handleOnSchemaBlur,
    handleOnSchemaChange,
  }
}
