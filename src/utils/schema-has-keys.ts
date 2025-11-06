export const schemaHasKeys = <T extends object>(schema: T, key: PropertyKey): boolean => {
  return Object.values(schema).every((v) => v && typeof v === "object" && key in v)
}
