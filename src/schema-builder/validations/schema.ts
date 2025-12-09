import { z } from "zod"

const reservedWords = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
  "let",
  "enum",
  "await",
  "implements",
  "package",
  "protected",
  "private",
  "public",
  "interface",
])

export const FormFieldSchema = z
  .object({
    id: z
      .string({
        message: "Oops! The 'id' field is missing. Make sure it's a text value",
      })
      .min(1, "The 'id' field cannot be empty")
      .regex(
        /^[A-Za-z_$][A-Za-z0-9_$]*$/,
        "Please choose a short name using only letters, numbers, or _ for the 'id' field",
      )
      .refine(
        (v) => !reservedWords.has(v),
        "The value used for the 'id' field is a reserved word. Please choose a different one.",
      ),

    name: z
      .string({
        message: "Oops! The 'name' field is missing. Make sure it's a text value",
      })
      .min(1, "The 'name' field cannot be empty")
      .regex(
        /^[A-Za-z_$][A-Za-z0-9_$]*$/,
        "Please choose a short name using only letters, numbers, or _ for the 'name' field",
      )
      .refine(
        (v) => !reservedWords.has(v),
        "The value used for the 'name' field is a reserved word. Please choose a different one.",
      ),

    label: z
      .string({
        message: "The 'label' field should be a text value",
      })
      .optional(),

    type: z.enum(
      [
        "text",
        "number",
        "textarea",
        "select",
        "checkbox",
        "radio",
        "password",
        "email",
        "url",
        "tel",
        "search",
        "date",
        "datetime-local",
        "time",
        "month",
        "week",
        "range",
        "color",
        "file",
        "datalist",
        "progress",
        "meter",
        "output",
        "select-multiple",
      ],
      {
        message:
          "Oops! The 'type' field is missing or invalid. Please use one of the supported field types",
      },
    ),

    defaultValue: z.any().optional(),

    placeholder: z
      .string({
        message: "The 'placeholder' field should be a text value",
      })
      .optional(),

    class: z
      .string({
        message: "The 'class' field should be a text value",
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
    if (["select", "radio", "select-multiple", "datalist"].includes(field.type)) {
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
  name: z
    .string({
      message: "Oops! The 'name' of the form is missing. Make sure it's a text value",
    })
    .min(1, "The name of the form cannot be empty")
    .regex(
      /^[A-Za-z_$][A-Za-z0-9_$]*$/,
      "Please choose a short name using only letters, numbers, or _ for the name of the form",
    )
    .refine(
      (v) => !reservedWords.has(v),
      "The value used for the 'name' of the form is a reserved word. Please choose a different one.",
    ),
  fields: z
    .array(FormFieldSchema, {
      message: "The 'fields' should be an array containing your form fields",
    })
    .min(1, "Your form needs at least one field to work")
    .refine((fields) => {
      const ids = fields.map((f) => f.id.toLowerCase())
      const uniqueIds = new Set(ids)
      return ids.length === uniqueIds.size
    }, "Oops! Each field 'id' must be unique")
    .refine((fields) => {
      const names = fields.map((f) => f.name.toLowerCase())
      const uniqueNames = new Set(names)
      return names.length === uniqueNames.size
    }, "Oops! Each field 'name' must be unique"),
})
