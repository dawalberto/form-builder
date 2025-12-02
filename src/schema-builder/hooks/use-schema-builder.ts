import { useCallback, useEffect, useMemo } from "react"
import { useShallow } from "zustand/shallow"
import { useStickyState } from "@/shared/hooks"
import { useAppStore } from "@/shared/stores"
import { debounce } from "@/shared/utils"
import { FormSchema } from "../validations"

export const useSchemaBuilder = () => {
  const [schemaJSON, setSchemaJSON] = useStickyState<string>("", "schema-builder-schema-json")
  const { setSchema, setTSchemaValidations } = useAppStore(
    useShallow(({ setSchema, setTSchemaValidations }) => ({ setSchema, setTSchemaValidations })),
  )

  const validateSchema = useCallback(
    (jsonString: string) => {
      console.log("💣🚨 validating")
      // Empty textarea case
      if (!jsonString) {
        setSchema(null)
        setTSchemaValidations({ validJSON: null, fieldsErrors: null })
        return
      }

      try {
        const schemaValidationResult = FormSchema.safeParse(JSON.parse(jsonString))

        if (!schemaValidationResult.success) {
          setTSchemaValidations({
            validJSON: true,
            fieldsErrors: JSON.parse(schemaValidationResult.error.message),
          })
          return
        }

        setSchema(schemaValidationResult.data)
      } catch (error) {
        setTSchemaValidations({ validJSON: false, fieldsErrors: null })
        console.error("Error parsing schema:", error)
        return
      }

      setTSchemaValidations({ validJSON: true, fieldsErrors: null })
    },
    [setSchema, setTSchemaValidations],
  )

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
    schemaJSON,
    handleOnSchemaBlur,
    handleOnSchemaChange,
  }
}
