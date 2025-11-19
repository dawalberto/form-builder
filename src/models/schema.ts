import type z from "zod"
import type { FormFieldSchema, FormSchema } from "../validations/schema"

type TFormFieldSchemaType = z.infer<typeof FormFieldSchema>
export type TFormSchemaType = z.infer<typeof FormSchema>
export type TFieldType = Pick<TFormFieldSchemaType, "type">["type"]
