import config from 'config:sanity'
import { useEffect } from 'react'

const BUNDLE_CHECK_INTERVAL = 60 * 1000
const CHANGES_AVAILABLE_MESSAGE =
  'New changes are available! For the best results the page will be refreshed to get the latest updates.'

async function getCurrentHash() {
  const basePath = (config.project && config.project.basePath) || '/'
  const html = await window.fetch(basePath).then(res => res.text())
  const [, hash] = html.match(/app\.bundle\.js\?(\w+)/) || []
  return hash
}

let hash = null
let interval = null

function BundleChecker() {
  useEffect(() => {
    getCurrentHash().then(newHash => {
      hash = newHash
    })

    interval = createInterval()

    return () => clearInterval(interval)
  }, [])

  // We're a react component, in theory, so return null to not render anything
  return null
}

export default BundleChecker

function createInterval() {
  return setInterval(async () => {
    const newHash = await getCurrentHash()

    if (hash && newHash !== hash) {
      clearInterval(interval)

      if (window.confirm(CHANGES_AVAILABLE_MESSAGE)) {
        window.location.reload()
      } else {
        interval = createInterval()
      }
    }
  }, BUNDLE_CHECK_INTERVAL)
}
