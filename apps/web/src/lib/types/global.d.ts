declare module 'react-obfuscate'
declare module '@algolia/client-search' {
  export interface MultipleQueriesQuery {
    params: SearchOptions
  }

  export interface SearchOptions {
    query: string
  }
}
