import languages from './config/languages.js'

export default {
  defaultNamespace: 'common',
  indentation: 2,
  lexers: {
    tsx: ['JsxLexer'],
    ts: ['JavascriptLexer'],
    default: ['JavascriptLexer'],
  },
  locales: languages.map(({ code }) => code),
  output: 'public/translations/$LOCALE/$NAMESPACE.json',
  input: ['app/**/*.{tsx,ts}'],
  sort: true,
  failOnWarnings: false,
}
