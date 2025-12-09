import { useCallback, useEffect, useMemo, useRef } from "react"
import { debounce } from "@/shared/utils"

export const useLocalStoragePersistence = <T>(key: string, debounceMs = 300) => {
  const keyRef = useRef(key)

  useEffect(() => {
    keyRef.current = key
  }, [key])

  const persistToLocalStorage = useCallback((value: T) => {
    try {
      window.localStorage.setItem(keyRef.current, JSON.stringify(value))
    } catch (error) {
      console.error(`Failed to persist to localStorage (key: ${keyRef.current}):`, error)
    }
  }, [])

  const debouncedPersist = useMemo(
    () => debounce((value: T) => persistToLocalStorage(value), debounceMs),
    [persistToLocalStorage, debounceMs],
  )

  useEffect(() => {
    return () => {
      debouncedPersist.cancel?.()
    }
  }, [debouncedPersist])

  return {
    persist: debouncedPersist,
    persistImmediate: persistToLocalStorage,
  }
}
