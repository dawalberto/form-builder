import { z } from "zod"

export const FormFieldSchema = z
  .object({
    id: z
      .string({
        message: "Oops! The 'id' field is missing. Make sure it's a text value",
      })
      .min(1, "The 'id' field cannot be empty"),

    name: z
      .string({
        message: "Oops! The 'name' field is missing. Make sure it's a text value",
      })
      .min(1, "The 'name' field cannot be empty"),

    label: z
      .string({
        message: "The 'label' field should be a text value",
      })
      .optional(),

    type: z.enum(["text", "number", "textarea", "select", "checkbox", "radio"], {
      message:
        "Oops! The 'type' field is missing or invalid. Please use one of: text, number, textarea, select, checkbox, or radio",
    }),

    defaultValue: z.any().optional(),

    placeholder: z
      .string({
        message: "The 'placeholder' field should be a text value",
      })
      .optional(),

    required: z
      .boolean({
        message: "The 'required' field should be true or false",
      })
      .optional(),

    options: z
      .array(
        z.object({
          label: z
            .string({
              message: "Oops! Each option needs a 'label' field with a text value",
            })
            .min(1, "Option labels cannot be empty"),
          value: z.union([z.string(), z.number()], {
            message: "Option values should be either text or a number",
          }),
        }),
        {
          message: "The 'options' field should be a list of option objects",
        },
      )
      .optional(),
  })
  .superRefine((field, ctx) => {
    if (["select", "radio"].includes(field.type)) {
      if (!field.options || field.options.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Oops! Fields of type '${field.type}' need at least one option in the 'options' array`,
          path: ["options"],
        })
      }
    }
  })

export const FormSchema = z.object({
  fields: z
    .array(FormFieldSchema, {
      message: "The 'fields' should be an array containing your form fields",
    })
    .min(1, "Your form needs at least one field to work"),
})

export type FormSchemaType = z.infer<typeof FormSchema>
export type FormFieldSchemaType = z.infer<typeof FormFieldSchema>
