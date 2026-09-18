'use client'

import { useMountEffect } from '@repo/lib/hooks/use-mount-effect'
import {
	createContext,
	memo,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useRef,
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
	function getThemeScript({
		forcedTheme,
		defaultTheme,
		themes,
	}: Omit<ThemeProviderProps, 'children'> & {
		themes: string[]
		defaultTheme: string
	}) {
		const isDefaultSystem = defaultTheme === 'system'

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

			return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${isDefaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDom(
				'dark',
			)}}else{${updateDom('light')}}}else if(e)${updateDom('e', true)};${
				isDefaultSystem ? '' : `else{${updateDom(defaultTheme, false, false)}}`
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

	const themeRef = useRef(theme)
	const forcedThemeRef = useRef(forcedTheme)
	const defaultThemeRef = useRef(defaultTheme)
	const themesRef = useRef(themes)
	themeRef.current = theme
	forcedThemeRef.current = forcedTheme
	defaultThemeRef.current = defaultTheme
	themesRef.current = themes

	function applyTheme(themeToApply?: string) {
		if (!themeToApply) return
		const name = themeToApply === 'system' ? getSystemTheme() : themeToApply

		const d = document.documentElement
		d.classList.remove(...themesRef.current)

		if (name) d.classList.add(name)
	}

	const setTheme = useCallback((newTheme: string) => {
		setThemeState(newTheme)

		try {
			localStorage.setItem(storageKey, newTheme)
		} catch (e) {
			if (e instanceof Error) console.error(e.message)
		}

		if (!forcedThemeRef.current) {
			applyTheme(newTheme)
		}
	}, [])

	// Subscribe once: system preference + cross-tab storage. Theme DOM updates
	// happen in setTheme (user/storage-driven) and on mount below.
	useMountEffect(() => {
		applyTheme(forcedThemeRef.current ?? themeRef.current)

		const media = window.matchMedia(MEDIA)

		function handleMediaQuery(e: MediaQueryListEvent | MediaQueryList) {
			const resolved = getSystemTheme(e)
			setResolvedTheme(resolved)

			if (themeRef.current === 'system' && !forcedThemeRef.current) {
				applyTheme('system')
			}
		}

		// Intentionally use deprecated listener methods to support iOS & old browsers
		media.addListener(handleMediaQuery)
		handleMediaQuery(media)

		function handleStorage(e: StorageEvent) {
			if (e.key !== storageKey) {
				return
			}

			// If default theme set, use it if localstorage === null (happens on local storage manual deletion)
			const selectedTheme = e.newValue ?? defaultThemeRef.current
			setTheme(selectedTheme)
		}

		window.addEventListener('storage', handleStorage)

		return () => {
			media.removeListener(handleMediaQuery)
			window.removeEventListener('storage', handleStorage)
		}
	})

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
