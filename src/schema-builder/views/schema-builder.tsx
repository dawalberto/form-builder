import { FormPreview } from "@/form-preview/views/form-preview"
import { SchemaValidations } from "../components"
import { useSchemaBuilder } from "../hooks"

export const SchemaBuilder = () => {
  const { schemaJSON, handleOnSchemaBlur, handleOnSchemaChange } = useSchemaBuilder()

  return (
    <main className="space-y-4">
      <div className="flex flex-col gap-2">
        <SchemaValidations />
        <label htmlFor="schemaJSON">Paste here your Form Schema in JSON format</label>
        <textarea
          id="schemaJSON"
          name="schemaJSON"
          value={schemaJSON}
          onChange={handleOnSchemaChange}
          onBlur={handleOnSchemaBlur}
          className="border w-full min-h-96 font-mono p-3 bg-stone-50 text-stone-700"
        />
      </div>
      <div className="mt-8">
        <FormPreview />
      </div>
    </main>
  )
}
