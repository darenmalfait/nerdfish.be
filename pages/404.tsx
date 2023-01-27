import {FourOhFour} from '../components/layout/errors'
import {Layout} from '../components/layout/layout'
import global from '../content/global/index.json'

export default function NotFoundPage() {
  return (
    <Layout globalData={global}>
      <FourOhFour />
    </Layout>
  )
}
