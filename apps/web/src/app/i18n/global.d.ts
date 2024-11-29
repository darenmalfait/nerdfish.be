// Use type safe message keys with `next-intl`
type GlobalMessages = typeof import('./dictionaries/en.json')
type ZodMessages = typeof import('./dictionaries/zod/en.json')
type Messages = GlobalMessages & ZodMessages
declare interface IntlMessages extends Messages {}
