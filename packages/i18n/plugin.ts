import { type NextConfig } from 'next'
import withNextIntl from 'next-intl/plugin'

export const withTranslations = (
	requestConfigPath: string,
	conf: NextConfig,
) => {
	return withNextIntl(requestConfigPath)(conf)
}
