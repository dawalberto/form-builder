import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
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
        <SyntaxHighlighter language="tsx" style={oneDark} showLineNumbers>
          {formStringComponent}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
