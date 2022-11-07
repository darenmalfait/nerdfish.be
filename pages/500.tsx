import { ServerError } from '../components/layout/errors'
import { Layout } from '../components/layout/layout'

export default function ServerErrorPage() {
  return (
    <Layout globalData={global}>
      <ServerError />
    </Layout>
  )
}
