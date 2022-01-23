export function padZero(str: string | number, len?: number): string {
  len = len || 2
  const zeros = new Array(len).join(`0`)

  return (zeros + str).slice(-len)
}

export function invertColor(hex: string, bw: boolean): string {
  if (hex.indexOf(`#`) === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex && hex.length === 3) {
    hex = (hex[0] as string) + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error(`Invalid HEX color.`)
  }
  const rNumber = parseInt(hex.slice(0, 2), 16)
  const gNumber = parseInt(hex.slice(2, 4), 16)
  const bNumber = parseInt(hex.slice(4, 6), 16)
  if (bw) {
    return rNumber * 0.299 + gNumber * 0.587 + bNumber * 0.114 > 186
      ? '#000'
      : '#fff'
  }
  // invert color components
  const r = (255 - rNumber).toString(16)
  const g = (255 - gNumber).toString(16)
  const b = (255 - bNumber).toString(16)
  // pad each with zeros and return
  return `#${padZero(r)}${padZero(g)}${padZero(b)}`
}
