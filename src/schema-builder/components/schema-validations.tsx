import clsx from "clsx"
import { useAppStore } from "@/shared/stores"

export const SchemaValidations = () => {
  const validations = useAppStore(({ schemaValidations }) => schemaValidations)

  if (!validations) return null

  return (
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
  )
}
