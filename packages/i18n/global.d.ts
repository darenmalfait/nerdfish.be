// Use type safe message keys with `next-intl`
import type GlobalMessages from './dictionaries/en.json'
import type ZodMessages from './dictionaries/zod/en.json'

type Messages = typeof GlobalMessages & typeof ZodMessages
type IntlMessages = Messages
