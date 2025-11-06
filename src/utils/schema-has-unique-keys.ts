export const schemaHasUniqueKeys = <T extends object>(schema: T, key: PropertyKey): boolean => {
  const schemasKeys = Object.values(schema).map((field) => field[key])
  const uniqueKeys = new Set(schemasKeys)
  return uniqueKeys.size === schemasKeys.length
}
