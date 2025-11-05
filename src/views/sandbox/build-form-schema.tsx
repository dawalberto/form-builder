import { useState } from "react"
import { Button, EButtonVariants } from "../../components"

type TFieldset = {
  name: string
  // TODO inputs: Input[]
}

export const BuildFormSchema = () => {
  const [fieldsets, setFieldsets] = useState<Map<string, TFieldset>>()

  const handleAddFieldset = () => {
    const name = prompt("Fieldset name:")

    // TODO - validate unique names and right format and length
    if (name && !fieldsets?.has(name)) {
      setFieldsets((prev) => new Map(prev).set(name, { name }))
    }
  }

  const handleAddInput = (fieldsetName?: string) => {
    console.log("Agregar input")
  }

  const handleRemoveFieldset = (fieldsetName: string) => {
    setFieldsets((prev) => {
      const newMap = new Map(prev)
      newMap.delete(fieldsetName)
      return newMap
    })
  }

  return (
    <main className="space-y-4">
      <h1 className="font-medium text-xl">Build Form Schema ⚙️</h1>
      <div className="flex gap-2 justify-end">
        <Button label="Add Fieldset" onClick={handleAddFieldset} />
        <Button
          label="Add Input"
          variant={EButtonVariants.PRIMARY}
          onClick={() => handleAddInput()}
        />
      </div>
      <div className="flex flex-col gap-4">
        {fieldsets?.size !== 0 && <h1>Form</h1>}
        {[...(fieldsets?.entries() || [])].map(([fsName, fs]) => (
          <fieldset key={fsName} className="border border-emerald-400 p-4">
            <legend>{fsName}</legend>
            <div>{/* Inputs here */}</div>
            <div className="flex gap-2 justify-end">
              <Button
                label="Add Input"
                variant={EButtonVariants.PRIMARY}
                onClick={() => handleAddInput(fsName)}
              />
              <Button
                label="Remove Fieldset"
                variant={EButtonVariants.DANGER}
                onClick={() => handleRemoveFieldset(fsName)}
              />
            </div>
          </fieldset>
        ))}
      </div>
    </main>
  )
}
