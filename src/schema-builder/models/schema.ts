import type z from "zod"
import type { FormFieldSchema, FormSchema } from "../validations"

export type TFormFieldSchemaType = z.infer<typeof FormFieldSchema>
export type TFormSchemaType = z.infer<typeof FormSchema>
export type TFieldType = Pick<TFormFieldSchemaType, "type">["type"]
export type TFieldValueType = string | number | boolean | null | File | string[]
