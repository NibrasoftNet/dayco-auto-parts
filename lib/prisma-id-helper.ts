// helpers.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateSyntheticId(record: any, keys: string[]): string {
  return keys.map(k => (record[k] !== null && record[k] !== undefined ? record[k] : "")).join("-");
}
