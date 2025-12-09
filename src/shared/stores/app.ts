import type { ZodError } from "zod"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { TFormSchemaType } from "@/schema-builder/models"

type TSchemaValidations = {
  validJSON: boolean | null
  fieldsErrors: ZodError[] | null
}

type AppState = {
  schema: TFormSchemaType | null
  schemaValidations: TSchemaValidations | null
  isValidSchema: boolean

  setSchema: (schema: TFormSchemaType | null) => void
  setTSchemaValidations: (validations: TSchemaValidations | null) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      schema: null,
      schemaValidations: null,
      isValidSchema: false,

      setSchema: (schema) => set({ schema }, false, "setSchema"),
      setTSchemaValidations: (schemaValidations) => {
        const schema = get().schema
        set(
          {
            schemaValidations,
            isValidSchema: isValidSchema(schema, schemaValidations),
          },
          false,
          "setTSchemaValidations",
        )
      },
    }),
    { name: "FormBuilderStore" },
  ),
)

const isValidSchema = (
  schema: AppState["schema"],
  schemaValidations: AppState["schemaValidations"],
): boolean => !!(!!schema && schemaValidations?.validJSON && !schemaValidations?.fieldsErrors)
