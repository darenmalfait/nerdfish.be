import { GenericErrorBoundary } from '~/route-containers/boundaries/generic-error-boundary'
import Component, {
  meta,
  CatchBoundary,
} from '~/route-containers/generic-page/generic-page.component'
import {
  loader,
  handle,
} from '~/route-containers/generic-page/generic-page.server'

export {
  loader,
  meta,
  handle,
  CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
}

export default Component
