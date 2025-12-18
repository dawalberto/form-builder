import { JSONEditor } from "@/shared/components"
import { SchemaShortcuts, SchemaValidations } from "../components"
import { useSchemaBuilder } from "../hooks"

export const SchemaBuilder = () => {
  const { initialSchemaJSON, handleOnSchemaChange } = useSchemaBuilder()

  return (
    <main className="flex flex-col gap-y-2">
      <SchemaValidations />
      <span className="text-center">↓ Paste here your Form Schema in JSON format ↓</span>

      <div className="flex flex-col sm:flex-row border border-stone-400 text-sm">
        <div className="w-full sm:w-3/5 sm:border-r border-stone-400">
          <JSONEditor initialValue={initialSchemaJSON} onChange={handleOnSchemaChange} />
        </div>
        <div className="w-full sm:w-2/5 sm:border-none border-t border-stone-400">
          <SchemaShortcuts />
        </div>
      </div>
    </main>
  )
}
