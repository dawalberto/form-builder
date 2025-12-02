import type { ZodError } from "zod"
import { create } from "zustand"
import type { TFormSchemaType } from "@/schema-builder/models"

type TSchemaValidations = {
  validJSON: boolean | null
  fieldsErrors: ZodError[] | null
}

type AppState = {
  schema: TFormSchemaType | null
  schemaValidations: TSchemaValidations | null

  setSchema: (schema: TFormSchemaType | null) => void
  setTSchemaValidations: (validations: TSchemaValidations | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  schema: null,
  schemaValidations: null,

  setSchema: (schema) => set({ schema }),
  setTSchemaValidations: (schemaValidations) => set({ schemaValidations }),
}))
