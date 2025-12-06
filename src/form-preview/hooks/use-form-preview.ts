import { useCallback, useEffect, useState } from "react"
import { useLocation } from "wouter"
import { useShallow } from "zustand/shallow"
import { useAppStore } from "@/shared/stores"
import { FormStringBuilder } from "../core"

export const useFormPreview = () => {
  const [_, navigate] = useLocation()
  const [formName, setFormName] = useState<string>("")
  const [formStringComponent, setFormStringComponent] = useState<string>("")
  const { schema, isValidSchema } = useAppStore(
    useShallow(({ schema, isValidSchema }) => ({ schema, isValidSchema })),
  )

  const generateFormStringComponent = useCallback(async () => {
    if (!schema || !isValidSchema) {
      return
    }

    const formBuilder = new FormStringBuilder(schema)
    setFormName(formBuilder.formName)
    setFormStringComponent(await formBuilder.build())
  }, [schema, isValidSchema])

  useEffect(() => {
    generateFormStringComponent()
  }, [generateFormStringComponent])

  useEffect(() => {
    if (!isValidSchema) {
      navigate("/")
    }
  }, [isValidSchema, navigate])

  return { formName, formStringComponent }
}
