'use client'

import {
	createContext,
	memo,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

const colorSchemes = ['light', 'dark']
const defaultThemes = ['light', 'dark']
const MEDIA = '(prefers-color-scheme: dark)'
const isServer = typeof window === 'undefined'
const storageKey = 'theme'

function getSystemTheme(e?: MediaQueryList | MediaQueryListEvent) {
	const media: MediaQueryList | MediaQueryListEvent =
		e ?? window.matchMedia(MEDIA)

	const isDark = media.matches
	const systemTheme = isDark ? 'dark' : 'light'
	return systemTheme
}

function getTheme(key: string, fallback?: string) {
	if (isServer) return undefined
	let theme: string | undefined

	try {
		theme = localStorage.getItem(key) ?? undefined
	} catch (e) {
		if (e instanceof Error) console.error('e', e.message)
	}
	return theme ?? fallback
}

interface ThemeContextProps {
	themes: string[] // List of all available theme names
	forcedTheme?: string // Forced theme name for the current page
	setTheme: (theme: string) => void
	theme?: string // Current theme name
	systemTheme?: 'dark' | 'light' // If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is
}

const ThemeContext = createContext<ThemeContextProps | null>(null)
ThemeContext.displayName = 'ThemeContext'

interface ThemeProviderProps {
	forcedTheme?: string //  Forced theme name for the current page
	defaultTheme?: string
	themes?: string[]
	children?: ReactNode
}

const ThemeScript = memo(
	function ThemeScript({
		forcedTheme,
		defaultTheme,
		themes,
	}: Omit<ThemeProviderProps, 'children'> & {
		themes: string[]
		defaultTheme: string
	}) {
		const defaultSystem = defaultTheme === 'system'

		// Code-golfing the amount of characters in the script
		const optimization = (() => {
			const removeClasses = `c.remove(${themes
				.map((t: string) => `'${t}'`)
				.join(',')})`

			return `var d=document.documentElement,c=d.classList;${removeClasses};`
		})()

		const fallbackColorScheme = (() => {
			const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null

			if (fallback) {
				return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`
			}

			return `if(e==='light'||e==='dark')d.style.colorScheme=e`
		})()

		const updateDom = (
			name: string,
			literal = false,
			setColorScheme = true,
		) => {
			const resolvedName = name
			const val = literal ? `${name}|| ''` : `'${resolvedName}'`
			let text = ''

			// MUCH faster to set colorScheme alongside HTML attribute/class
			// as it only incurs 1 style recalculation rather than 2
			// This can save over 250ms of work for pages with big DOM
			if (setColorScheme && !literal && colorSchemes.includes(name)) {
				text += `d.style.colorScheme = '${name}';`
			}

			if (literal || resolvedName) {
				text += `c.add(${val})`
			} else {
				text += 'null'
			}

			return text
		}

		const scriptSrc = (() => {
			if (forcedTheme) {
				return `!function(){${optimization}${updateDom(forcedTheme)}}()`
			}

			return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDom(
				'dark',
			)}}else{${updateDom('light')}}}else if(e)${updateDom('e', true)};${
				defaultSystem ? '' : `else{${updateDom(defaultTheme, false, false)}}`
			}${fallbackColorScheme}}catch(e){console.error(e.message);}}()`
		})()

		return <script dangerouslySetInnerHTML={{ __html: scriptSrc }} />
	},
	// Never re-render this component
	() => true,
)

// import { ThemeProvider } from "path-to-context/ThemeContext"
// use <ThemeProvider> as a wrapper around the part you need the context for
function ThemeProvider({
	forcedTheme,
	themes = defaultThemes,
	defaultTheme = 'system',
	children,
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState(() =>
		getTheme(storageKey, defaultTheme),
	)
	const [resolvedTheme, setResolvedTheme] = useState(() => getTheme(storageKey))
	const applyTheme = useCallback(
		(themeToApply?: string) => {
			if (!themeToApply) return
			const name = themeToApply === 'system' ? getSystemTheme() : themeToApply

			const d = document.documentElement
			d.classList.remove(...themes)

			if (name) d.classList.add(name)
		},
		[themes],
	)

	const setTheme = useCallback((newTheme: string) => {
		setThemeState(newTheme)

		// Save to storage
		try {
			localStorage.setItem(storageKey, newTheme)
		} catch (e) {
			if (e instanceof Error) console.error(e.message)
		}
	}, [])

	const handleMediaQuery = useCallback(
		(e: MediaQueryListEvent | MediaQueryList) => {
			const resolved = getSystemTheme(e)
			setResolvedTheme(resolved)

			if (theme === 'system' && !forcedTheme) {
				applyTheme('system')
			}
		},
		[theme, forcedTheme, applyTheme],
	)

	// Always listen to System preference
	useEffect(() => {
		const media = window.matchMedia(MEDIA)

		// Intentionally use deprecated listener methods to support iOS & old browsers
		media.addListener(handleMediaQuery)
		handleMediaQuery(media)

		return () => media.removeListener(handleMediaQuery)
	}, [handleMediaQuery])

	// localStorage event handling
	useEffect(() => {
		const handleStorage = (e: StorageEvent) => {
			if (e.key !== storageKey) {
				return
			}

			// If default theme set, use it if localstorage === null (happens on local storage manual deletion)
			const selectedTheme = e.newValue ?? defaultTheme
			setTheme(selectedTheme)
		}

		window.addEventListener('storage', handleStorage)
		return () => window.removeEventListener('storage', handleStorage)
	}, [defaultTheme, setTheme])

	// Whenever theme or forcedTheme changes, apply it
	useEffect(() => {
		applyTheme(forcedTheme ?? theme)
	}, [applyTheme, forcedTheme, theme])

	const providerValue = useMemo<ThemeContextProps>(
		() => ({
			theme,
			setTheme,
			forcedTheme,
			themes,
			systemTheme: resolvedTheme as 'light' | 'dark' | undefined,
		}),
		[theme, setTheme, forcedTheme, resolvedTheme, themes],
	)

	return (
		<ThemeContext.Provider value={providerValue}>
			<ThemeScript
				{...{
					forcedTheme,
					storageKey,
					themes,
					defaultTheme,
				}}
			/>
			{children}
		</ThemeContext.Provider>
	)
}

// import { useTheme } fron "path-to-context/ThemeContext"
// within functional component
// const { sessionToken, ...ThemeContext } = useTheme()
function useTheme(): ThemeContextProps {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('You should use useTheme within an ThemeContext')
	}

	return context
}

export { ThemeProvider, useTheme }
