import { clsx } from "clsx"
import type { CopyState } from "../hooks/use-copy-to-clipboard"

type CopyButtonProps = {
  onClick: () => void
  copyState: CopyState
}

export const CopyButton = ({ onClick, copyState }: CopyButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Copy generated code"
      className={clsx(
        "absolute top-2 z-10 p-2 rounded-md transition-colors",
        "right-2 md:right-[calc(30%+0.5rem)]",
        "bg-stone-100 hover:bg-stone-200 border border-stone-300 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2",
        copyState === "success" && "bg-emerald-100 hover:bg-emerald-200 border-emerald-300",
        copyState === "error" && "bg-red-100 hover:bg-red-200 border-red-300",
      )}
      title={
        copyState === "success"
          ? "Copied!"
          : copyState === "error"
            ? "Failed to copy"
            : "Copy to clipboard"
      }
    >
      {copyState === "success" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="text-emerald-600"
          aria-hidden="true"
        >
          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="text-stone-600"
          aria-hidden="true"
        >
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z" />
          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
        </svg>
      )}
    </button>
  )
}
