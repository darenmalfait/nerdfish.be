declare module '*.png'
declare module '*.webp'
declare module 'react-obfuscate'

declare namespace NodeJS {
	interface ProcessEnv {
		// Server
		NODE_ENV: 'development' | 'production' | 'test'
		RESEND_API_KEY: string
		NERDFISH_SMTP: string
		TINA_TOKEN: string
		RECAPTCHA_SECRETKEY: string

		// Client
		NEXT_PUBLIC_URL: string
		NEXT_PUBLIC_TINA_CLIENT_ID: string
		NEXT_PUBLIC_RECAPTCHA_SITEKEY: string

		// CI/CD
		// NEXT_PUBLIC_TINA_BRANCH?: string // custom branch env override
		// NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF?: string // Vercel branch env
		// HEAD?: string // Netlify branch env
	}
}
