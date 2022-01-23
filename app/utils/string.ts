// ts-prune-ignore-next
export function toKebab(value: string): string {
  const a = `àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;`
  const b = `aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------`
  const p = new RegExp(a.split(``).join(`|`), `g`)

  return value
    .toString()
    .toLowerCase()
    .replace(/\s+/g, `-`) // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, `-and-`) // Replace & with 'and'
    .replace(/[^\w-]+/g, ``) // Remove all non-word characters
    .replace(/--+/g, `-`) // Replace multiple - with single -
    .replace(/^-+/, ``) // Trim - from start of text
    .replace(/-+$/, ``) // Trim - from end of text
}

export function stripPreSlash(value: string): string {
  return value ? value.replace(/^\/+/g, '') : value
}

export function removeTrailingSlash(s: string) {
  return s.endsWith('/') ? s.slice(0, -1) : s
}
