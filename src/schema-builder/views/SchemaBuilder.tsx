import { JSONEditor } from "@/shared/components"
import { SchemaValidations } from "../components"
import { useSchemaBuilder } from "../hooks"

export const SchemaBuilder = () => {
  const { schemaJSON, handleOnSchemaChange } = useSchemaBuilder()

  return (
    <main className="flex flex-col gap-y-2">
      <SchemaValidations />
      <span className="text-center">↓ Paste here your Form Schema in JSON format ↓</span>
      <JSONEditor value={schemaJSON} onChange={handleOnSchemaChange} />
    </main>
  )
}
