import { useCallback, useEffect, useMemo } from "react"
import { useShallow } from "zustand/shallow"
import { useLocalStoragePersistence } from "@/shared/hooks"
import { useAppStore } from "@/shared/stores"
import { debounce } from "@/shared/utils"
import { FORM_SCHEMA_STORAGE_KEY } from "../constants"
import { FormSchema } from "../validations"

export const useSchemaBuilder = () => {
  const { setSchema, setTSchemaValidations } = useAppStore(
    useShallow(({ setSchema, setTSchemaValidations }) => ({ setSchema, setTSchemaValidations })),
  )

  const initialSchemaJSON = useMemo(() => {
    const stored = window.localStorage.getItem(FORM_SCHEMA_STORAGE_KEY)
    return stored ? JSON.parse(stored) : ""
  }, [])

  const { persist: persistToLocalStorage } =
    useLocalStoragePersistence<string>(FORM_SCHEMA_STORAGE_KEY)

  const validateSchema = useCallback(
    (jsonString: string) => {
      console.log("💣🚨 validating")

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
    () => debounce((value: string) => validateSchema(value), 300),
    [validateSchema],
  )

  const handleOnSchemaChange = useCallback(
    (schemaValue: string) => {
      persistToLocalStorage(schemaValue)
      debouncedValidate(schemaValue)
    },
    [persistToLocalStorage, debouncedValidate],
  )

  useEffect(() => {
    if (!initialSchemaJSON) return
    validateSchema(initialSchemaJSON)
  }, [initialSchemaJSON, validateSchema])

  useEffect(() => {
    return () => {
      debouncedValidate.cancel?.()
    }
  }, [debouncedValidate])

  return {
    initialSchemaJSON,
    handleOnSchemaChange,
  }
}
