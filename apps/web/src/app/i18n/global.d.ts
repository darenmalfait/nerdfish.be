// Use type safe message keys with `next-intl`
type GlobalMessages = typeof import('./dictionaries/en.json')
type Messages = GlobalMessages
declare interface IntlMessages extends Messages {}
