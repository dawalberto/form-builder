import clsx from "clsx"
import { FormPreview } from "@/form-preview/views/form-preview"
import { useSchemaBuilder } from "../hooks"

export const SchemaBuilder = () => {
  const { schema, schemaJSON, validations, handleOnSchemaChange } = useSchemaBuilder()

  return (
    <main className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="schemaJSON">Paste here your Form Schema in JSON format</label>
        <textarea
          id="schemaJSON"
          name="schemaJSON"
          value={schemaJSON}
          onChange={handleOnSchemaChange}
          className="border w-full min-h-96 font-mono p-3 bg-stone-50 text-stone-700"
        />
        <div
          className={clsx(
            "flex flex-col gap-1",
            (validations.validJSON === true || validations.validJSON === null) &&
              validations.fieldsErrors === null
              ? "hidden"
              : "block",
          )}
        >
          <span>❌ Schema Errors:</span>
          <ul className="list-disc list-inside">
            {validations.validJSON === false && <li>❌ Invalid JSON</li>}
            {validations.fieldsErrors &&
              validations.fieldsErrors.length > 0 &&
              validations.fieldsErrors.map(({ name, message }) => (
                <li key={`${name}-${message}`}>{message}</li>
              ))}
          </ul>
        </div>
      </div>
      {validations.validJSON && validations.fieldsErrors === null && schema && (
        <div className="mt-8">
          <FormPreview schema={schema} />
        </div>
      )}
    </main>
  )
}
