import { useFetcher } from '@remix-run/react'
import * as React from 'react'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeContextProps = [
  Theme | null,
  React.Dispatch<React.SetStateAction<Theme | null>>,
]

const ThemeContext = React.createContext<ThemeContextProps | null>(null)
ThemeContext.displayName = 'ThemeContext'

const prefersLightMQ = '(prefers-color-scheme: light)'
const getPreferredTheme = () =>
  window.matchMedia(prefersLightMQ).matches ? Theme.LIGHT : Theme.DARK

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersLightMQ)}).matches
    ? 'light'
    : 'dark';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, you should not see this message. If you do, it's because you're trying to apply the theme twice. This is a bug in the client, please report it to the team.",
    );
  } else {
    cl.add(theme);
  }

  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  }
})();
`

function PreventFlashOnWrongTheme({ ssrTheme }: { ssrTheme: boolean }) {
  const [theme] = useTheme()

  return (
    <>
      {/*
        On the server, "theme" might be `null`, so clientThemeCode ensures that
        this is correct before hydration.
      */}
      <meta
        name="color-scheme"
        content={theme === 'light' ? 'light dark' : 'dark light'}
      />
      {/*
        If we know what the theme is from the server then we don't need
        to do fancy tricks prior to hydration to make things match.
      */}
      {ssrTheme ? null : (
        <script
          // NOTE: we cannot use type="module" because that automatically makes
          // the script "defer". That doesn't work for us because we need
          // this script to run synchronously before the rest of the document
          // is finished loading.
          dangerouslySetInnerHTML={{ __html: clientThemeCode }}
        />
      )}
    </>
  )
}

const themes: Array<Theme> = Object.values(Theme)

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && themes.includes(value as Theme)
}

interface ThemeProviderProps {
  children: React.ReactNode
  specifiedTheme?: Theme | null
}

// import { ThemeProvider } from "path-to-context/ThemeContext"
// use <ThemeProvider> as a wrapper around the part you need the context for
function ThemeProvider({ children, specifiedTheme }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme | null>(() => {
    // On the server, if we don't have a specified theme then we should
    // return null and the clientThemeCode will set the theme for us
    // before hydration. Then (during hydration), this code will get the same
    // value that clientThemeCode got so hydration is happy.
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme
      } else {
        return null
      }
    }

    // there's no way for us to know what the theme should be in this context
    // the client will have to figure it out before hydration.
    if (typeof window !== 'object') {
      return null
    }

    return getPreferredTheme()
  })

  const persistTheme = useFetcher()

  // TODO: remove this when persistTheme is memoized properly
  // Without storing persistTheme as a ref, we would need to include it in the dependency array of the useEffect. At the time of writing, the result from useFetcher isn’t memorised properly. This means that the value of persistTheme may change, which would cause our useEffect to run even if the theme hasn’t changed.
  const persistThemeRef = React.useRef(persistTheme)

  React.useEffect(() => {
    persistThemeRef.current = persistTheme
  }, [persistTheme])

  const mountRun = React.useRef(false)

  // watch for changes to the theme value and send any updates to the backend.
  React.useEffect(() => {
    // The useEffect will run when the provider is initially mounted (despite the theme not being changed),
    if (!mountRun.current) {
      mountRun.current = true
      return
    }

    if (!theme) {
      return
    }

    persistThemeRef.current.submit(
      { theme },
      { action: 'actions/set-theme', method: 'post' },
    )
  }, [theme])

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightMQ)
    const handleChange = () => {
      setTheme(mediaQuery.matches ? Theme.LIGHT : Theme.DARK)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

// import { useTheme } fron "path-to-context/ThemeContext"
// within functional component
// const { sessionToken, ...ThemeContext } = useTheme();
function useTheme(): ThemeContextProps {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error('You should use useTheme within an ThemeContext')
  }

  return context
}

export { isTheme, PreventFlashOnWrongTheme, Theme, ThemeProvider, useTheme }
