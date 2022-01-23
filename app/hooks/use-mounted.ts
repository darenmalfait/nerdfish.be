import * as React from 'react'

function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

export { useHasMounted }
