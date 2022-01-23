import * as React from 'react'

function useClickOutside(
  callback?: EventListener,
): React.RefObject<HTMLDivElement> {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isTouchEvent, setTouchEvent] = React.useState(false)
  const eventType = isTouchEvent ? `touchend` : `click`

  React.useEffect(() => {
    function handleEvent(e: Event) {
      if ((e.type === `click` && isTouchEvent) || !callback) {
        return
      }

      if (ref.current && e.target !== null) {
        if (!ref.current.contains(e.target as Node)) {
          callback(e)
        }
      }
    }

    document.addEventListener(eventType, handleEvent, true)

    return () => {
      document.removeEventListener(eventType, handleEvent, true)
    }
  }, [callback, eventType, isTouchEvent])

  React.useEffect(() => {
    setTouchEvent(`ontouchstart` in document.documentElement)
  }, [])

  return ref
}

export { useClickOutside }
