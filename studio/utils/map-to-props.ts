export function mapObjectToSchema(items: any): any[] {
  return Object.values(items).map(item => ({
    ...(item as Record<string, unknown>),
  }))
}
