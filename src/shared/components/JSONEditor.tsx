import { SandpackCodeEditor, SandpackProvider, useSandpack } from "@codesandbox/sandpack-react"
import { useEffect } from "react"

type JSONEditorProps = {
  initialValue?: string
  onChange?: (value: string) => void
}

export const JSONEditor = ({ initialValue, onChange }: JSONEditorProps) => {
  return (
    <SandpackProvider
      id="schemaJSON"
      template="vanilla"
      files={{
        "/schema.json": {
          code: initialValue || "",
          active: true,
        },
      }}
    >
      <SandpackCodeEditor
        showTabs={false}
        showLineNumbers={true}
        wrapContent={true}
        style={{ height: "90dvh" }}
        className="border border-stone-400 text-sm"
      />
      <ValueUpdater onChange={onChange} />
    </SandpackProvider>
  )
}

const ValueUpdater = ({ onChange }: Pick<JSONEditorProps, "onChange">) => {
  const { sandpack } = useSandpack()
  const { files, activeFile } = sandpack

  useEffect(() => {
    const code = files[activeFile].code
    onChange?.(code)
  }, [files, onChange, activeFile])

  return null
}
