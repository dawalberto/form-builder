import { useCallback, useEffect, useState } from "react"

export type CopyState = "idle" | "success" | "error"

export const useCopyToClipboard = () => {
  const [copyState, setCopyState] = useState<CopyState>("idle")

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyState("success")
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
      setCopyState("error")
    }
  }, [])

  useEffect(() => {
    if (copyState === "success" || copyState === "error") {
      const timeout = setTimeout(() => {
        setCopyState("idle")
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [copyState])

  return { copyToClipboard, copyState }
}
