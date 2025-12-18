import { SandpackCodeEditor, SandpackProvider, useSandpack } from "@codesandbox/sandpack-react"
import { useEffect, useState } from "react"

type JSONEditorProps = {
  initialValue?: string
  onChange?: (value: string) => void
}

export const JSONEditor = ({ initialValue, onChange }: JSONEditorProps) => {
  const [key, setKey] = useState(0)
  const [currentValue, setCurrentValue] = useState(initialValue || "")

  useEffect(() => {
    const handleSchemaUpdate = (event: CustomEvent<{ schema: string }>) => {
      setCurrentValue(event.detail.schema)
      setKey((prev) => prev + 1)
    }

    window.addEventListener("schema-updated", handleSchemaUpdate as EventListener)
    return () => {
      window.removeEventListener("schema-updated", handleSchemaUpdate as EventListener)
    }
  }, [])

  return (
    <SandpackProvider
      key={key}
      id="schemaJSON"
      template="vanilla"
      files={{
        "/schema.json": {
          code: currentValue,
          active: true,
        },
      }}
    >
      <SandpackCodeEditor
        showTabs={false}
        showLineNumbers={true}
        wrapContent={true}
        style={{ height: "90dvh" }}
        className="text-sm"
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
