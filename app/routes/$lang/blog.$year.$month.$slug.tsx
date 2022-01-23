import Component, {
  meta,
  CatchBoundary,
} from '~/route-containers/blog-page/blog-page.component'
import { loader, handle } from '~/route-containers/blog-page/blog-page.server'
import { GenericErrorBoundary } from '~/route-containers/boundaries/generic-error-boundary'

export {
  loader,
  meta,
  handle,
  CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
}

export default Component
