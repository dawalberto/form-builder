import type { TFormSchemaType } from "@/schema-builder/models"
import { CopyToClipboardButton } from "../../components/copy-to-clipboard-button"
import { useFormPreview } from "../hooks"

export const FormPreview = ({ schema }: { schema: TFormSchemaType }) => {
  const { formStringComponent } = useFormPreview({ schema })

  return (
    <div>
      <h2>Generated Form Component</h2>
      <div className="relative">
        <CopyToClipboardButton
          text={formStringComponent}
          ariaLabel="Copy generated form component code"
          className="absolute right-2 top-10"
        />
        <code>
          <pre className="overflow-x-auto p-4 bg-stone-900 text-stone-100 rounded-md">
            {formStringComponent}
          </pre>
        </code>
      </div>
    </div>
  )
}
