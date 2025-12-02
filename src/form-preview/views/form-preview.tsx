import { Sandpack } from "@codesandbox/sandpack-react"
import type { TFormSchemaType } from "@/schema-builder/models"
import { useFormPreview } from "../hooks"
export const FormPreview = ({ schema }: { schema: TFormSchemaType }) => {
  const { formStringComponent } = useFormPreview({ schema })

  return (
    <div>
      <h2>Generated Form Component</h2>
      {formStringComponent && (
        <Sandpack
          files={{
            "/form.tsx": formStringComponent,
            "/App.tsx": `
            import React from "react";
            import { ${schema.name}Form } from "./form";

            export default function App() {
              return <${schema.name}Form />
            }`,
          }}
          theme="auto"
          template="react-ts"
          options={{
            externalResources: ["https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"],
            readOnly: true,
            showReadOnly: false,
            showNavigator: true,
            editorHeight: "100dvh",
            activeFile: "/form.tsx",
            visibleFiles: ["/form.tsx"],
            editorWidthPercentage: 70,
          }}
        />
      )}
    </div>
  )
}
