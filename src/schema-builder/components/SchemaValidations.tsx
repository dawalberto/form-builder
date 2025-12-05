import clsx from "clsx"
import { Activity } from "react"
import { useShallow } from "zustand/shallow"
import { useAppStore } from "@/shared/stores"

export const SchemaValidations = () => {
  const { isValidSchema, schemaValidations: validations } = useAppStore(
    useShallow(({ isValidSchema, schemaValidations }) => ({ isValidSchema, schemaValidations })),
  )

  return (
    <Activity mode={!isValidSchema ? "visible" : "hidden"}>
      <div className={clsx("flex flex-col gap-1")}>
        <span>❌ Schema Errors:</span>
        <ul className="list-disc list-inside">
          {validations?.validJSON === false && <li>❌ Invalid JSON</li>}
          {validations?.fieldsErrors &&
            validations?.fieldsErrors.length > 0 &&
            validations?.fieldsErrors.map(({ name, message }) => (
              <li key={`${name}-${message}`}>{message}</li>
            ))}
        </ul>
      </div>
    </Activity>
  )
}
