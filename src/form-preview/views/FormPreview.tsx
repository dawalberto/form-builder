import { Sandpack } from "@codesandbox/sandpack-react"
import { Activity } from "react"
import { CopyButton } from "../components"
import { useCopyToClipboard, useFormPreview } from "../hooks"

export const FormPreview = () => {
  const { formStringComponent, formName } = useFormPreview()
  const { copyToClipboard, copyState } = useCopyToClipboard()

  const handleCopy = () => {
    if (formStringComponent) {
      copyToClipboard(formStringComponent)
    }
  }

  return (
    <div>
      <Activity mode={formStringComponent ? "visible" : "hidden"}>
        <div className="relative">
          <CopyButton onClick={handleCopy} copyState={copyState} />
          <Sandpack
            files={{
              "/form.tsx": formStringComponent,
              "/App.tsx": `
            import React from "react";
            import { ${formName}Form } from "./form";

            export default function App() {
              return <${formName}Form />
            }`,
            }}
            theme="light"
            template="react-ts"
            options={{
              externalResources: ["https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css"],
              readOnly: true,
              showReadOnly: false,
              showNavigator: true,
              editorHeight: "95dvh",
              activeFile: "/form.tsx",
              visibleFiles: ["/form.tsx"],
              editorWidthPercentage: 70,
            }}
          />
        </div>
      </Activity>
    </div>
  )
}
