export function stripPreSlash(value: string): string {
  return value ? value.replace(/^\/+/g, '') : value
}

export function stripTrailingSlash(s: string) {
  return s.endsWith('/') ? s.slice(0, -1) : s
}
