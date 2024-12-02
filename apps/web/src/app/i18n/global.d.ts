// Use type safe message keys with `next-intl`
import type GlobalTranslations from './dictionaries/en.json'
import type ZodTranslations from './dictionaries/zod/en.json'

type GlobalMessages = typeof GlobalTranslations
type ZodMessages = typeof ZodTranslations
type Messages = GlobalMessages & ZodMessages
type IntlMessages = Messages
