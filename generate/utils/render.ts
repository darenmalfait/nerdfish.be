import * as ejs from 'ejs'

export function render(content: string, data: any): string {
  return ejs.render(content, data)
}
