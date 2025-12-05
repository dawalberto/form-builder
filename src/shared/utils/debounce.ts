/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
export const debounce = <T extends (...args: any[]) => void>(callback: T, wait = 300) => {
  let timeoutId: number | null = null

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return debounced
}
