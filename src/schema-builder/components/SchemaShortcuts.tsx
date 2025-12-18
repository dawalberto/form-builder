import { Plus, Zap } from "lucide-react"
import { useShallow } from "zustand/shallow"
import { useAppStore } from "@/shared/stores"
import { FIELD_GROUPS, FORM_SCHEMA_STORAGE_KEY } from "../constants"
import type { TFieldType } from "../models"
import { addFieldToSchema } from "../utils"

export const SchemaShortcuts = () => {
  const { schema, setSchema, setTSchemaValidations } = useAppStore(
    useShallow(({ schema, setSchema, setTSchemaValidations }) => ({
      schema,
      setSchema,
      setTSchemaValidations,
    })),
  )

  const handleAddField = (type: TFieldType) => {
    const updatedSchema = addFieldToSchema(type, schema)

    setSchema(updatedSchema)
    setTSchemaValidations({ validJSON: true, fieldsErrors: null })

    const schemaJSON = JSON.stringify(updatedSchema, null, 2)
    localStorage.setItem(FORM_SCHEMA_STORAGE_KEY, schemaJSON)

    window.dispatchEvent(
      new CustomEvent("schema-updated", {
        detail: { schema: schemaJSON },
      }),
    )
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      <h2 className="text-lg text-stone-700 flex items-center gap-2">
        Quick Add Fields
        <Zap size={20} />
      </h2>

      {Object.entries(FIELD_GROUPS).map(([groupName, templates]) => (
        <div key={groupName} className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-stone-600">{groupName}</h3>
          <div className="flex flex-wrap gap-2">
            {templates.map((template) => {
              const Icon = template.icon
              return (
                <button
                  key={template.type}
                  type="button"
                  onClick={() => handleAddField(template.type)}
                  className="flex items-center gap-1 p-1.5 border text-sm font-medium transition-colors cursor-pointer"
                  title={`Add ${template.label}`}
                >
                  <Plus size={16} />
                  <Icon size={16} />
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
