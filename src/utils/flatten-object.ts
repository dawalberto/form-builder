/** biome-ignore-all lint/suspicious/noExplicitAny: <we cannot know the type of the object> */

type AnyObject = Record<string, any>

// Base flatten type
type Flatten<T> = {
  [K in keyof T as T[K] extends Record<string, any>
    ? "_id" extends keyof T[K]
      ? K
      : keyof Flatten<T[K]>
    : K]: T[K] extends Record<string, any>
    ? "_id" extends keyof T[K]
      ? T[K]
      : Flatten<T[K]>
    : T[K]
}

/**
 * Recursively flattens a nested object into a single-level object,
 * stopping when encountering a "field" object (object with "_id" key).
 */
export const flattenObject = <T extends AnyObject>(obj: T): Flatten<T> => {
  const result = {} as AnyObject

  function recurse(current: AnyObject) {
    for (const key in current) {
      const value = current[key]
      if (value && typeof value === "object" && !Array.isArray(value) && !("_id" in value)) {
        recurse(value)
      } else {
        result[key] = value
      }
    }
  }

  recurse(obj)
  return result as Flatten<T>
}
