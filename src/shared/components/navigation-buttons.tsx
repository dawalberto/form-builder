import clsx from "clsx"
import { Activity } from "react"
import { useLocation } from "wouter"
import { NAV_URLS } from "../constants"
import { useAppStore } from "../stores"

export const NavigationButtons = () => {
  const [location, navigate] = useLocation()
  const isValidSchema = useAppStore(({ isValidSchema }) => isValidSchema)

  return (
    <div className="w-fit flex gap-4 items-center justify-center fixed bottom-4 left-1/2 -translate-x-1/2 border border-stone-600 bg-stone-100">
      <Activity mode={location !== NAV_URLS.SCHEMA_BUILDER ? "visible" : "hidden"}>
        <button
          type="button"
          onClick={() => navigate(NAV_URLS.SCHEMA_BUILDER)}
          className="hover:bg-stone-200 px-4 py-2"
        >
          ⬅️ Back to Form Builder
        </button>
      </Activity>
      <Activity mode={location === NAV_URLS.SCHEMA_BUILDER ? "visible" : "hidden"}>
        <button
          type="button"
          onClick={() => navigate(NAV_URLS.FORM_PREVIEW)}
          disabled={!isValidSchema}
          className={clsx(
            "hover:bg-stone-200 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed",
            isValidSchema && "bg-emerald-200",
          )}
        >
          ➡️ Go to Form Preview
        </button>
      </Activity>
    </div>
  )
}
