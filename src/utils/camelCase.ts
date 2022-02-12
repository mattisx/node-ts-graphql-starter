// Postgres does not support camelCase column names (so we use snake_case),
// but we want to use camelCase in our API code.
// This is a convenience helper to take a db output and transform the column names.

const doCamelCase = (key: string) => {
  return key
    .split('_')
    .map((frag, i) => {
      if (i === 0) return frag
      return frag[0].toUpperCase() + frag.substring(1)
    })
    .join('')
}

export const camelCase = (dbOutput: any[]) => {
  return dbOutput.map((row: any[]) => {
    return Object.fromEntries(Object.entries(row).map(([key, value]) => [`${doCamelCase(key)}`, value]))
  })
}
