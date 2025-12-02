import clsx from "clsx"
import { Link } from "wouter"
import { FULL_HEIGHT_WITH_PADDING } from "@/shared/constants"
import { SchemaValidations } from "../components"
import { useSchemaBuilder } from "../hooks"

export const SchemaBuilder = () => {
  const { schemaJSON, handleOnSchemaBlur, handleOnSchemaChange } = useSchemaBuilder()

  return (
    <main className={clsx(FULL_HEIGHT_WITH_PADDING, "flex flex-col gap-y-2")}>
      <SchemaValidations />
      <label htmlFor="schemaJSON" className="font-semibold">
        👇 Paste here your Form Schema in JSON format
      </label>
      <textarea
        id="schemaJSON"
        name="schemaJSON"
        value={schemaJSON}
        onChange={handleOnSchemaChange}
        onBlur={handleOnSchemaBlur}
        className="border w-full h-full font-mono p-3 bg-stone-50 text-stone-700"
      />
      <Link href="/form-preview">Go to Form Preview</Link>
    </main>
  )
}
