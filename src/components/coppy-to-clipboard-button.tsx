import { useEffect, useState } from "react"

// Usage:
// <CopyToClipboardButton text="Hello world" />
// <CopyToClipboardButton text={() => computeValue()} label="Copy value" />

type Props = {
  /** Text to copy or a function that returns the text (can be async) */
  text: string | (() => string | Promise<string>)
  /** Button label shown when not copied */
  label?: string
  /** Label shown after successful copy */
  successLabel?: string
  /** How long (ms) the success state lasts before reverting */
  resetMs?: number
  /** Additional className for the button */
  className?: string
  /** Optional aria-label if you want a different accessible name */
  ariaLabel?: string
}

export const CopyToClipboardButton = ({
  text,
  label = "Copy",
  successLabel = "Copied!",
  resetMs = 1800,
  className = "",
  ariaLabel,
}: Props) => {
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), resetMs)
    return () => clearTimeout(id)
  }, [copied, resetMs])

  async function getTextToCopy() {
    if (typeof text === "string") return text
    try {
      const value = text()
      if (value instanceof Promise) return await value
      return value
    } catch (e) {
      return ""
    }
  }

  async function fallbackCopy(str: string) {
    // fallback for older browsers
    const textarea = document.createElement("textarea")
    textarea.value = str
    textarea.setAttribute("readonly", "")
    textarea.style.position = "absolute"
    textarea.style.left = "-9999px"
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand("copy")
      document.body.removeChild(textarea)
      return true
    } catch (err) {
      document.body.removeChild(textarea)
      return false
    }
  }

  async function handleCopy() {
    if (busy) return
    setBusy(true)
    const value = await getTextToCopy()
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        await fallbackCopy(value)
      }
      setCopied(true)
    } catch (err) {
      // If clipboard API fails, try the fallback
      await fallbackCopy(value)
      setCopied(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        disabled={busy}
        aria-label={ariaLabel}
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-offset-1 transition ${
          copied
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-white text-gray-800 hover:bg-gray-50"
        } ${className}`}
      >
        {/* Icon (clipboard) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="w-4 h-4"
        >
          <path
            d="M9 2h6a2 2 0 012 2v1h-2V4H9v1H7V4a2 2 0 012-2z"
            fill="currentColor"
            opacity="0.12"
          />
          <path
            d="M7 7h10v12a2 2 0 01-2 2H9a2 2 0 01-2-2V7z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="9"
            y="3"
            width="6"
            height="2"
            rx="0.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>{copied ? successLabel : label}</span>
      </button>

      {/* Visually hidden live region for screen readers */}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : "Not copied"}
      </span>
    </div>
  )
}
