import {useGlobal} from '../../context/global-provider'
import {Link} from '../common/link'
import {GithubIcon} from '../icons/github-icon'
import {Logo} from '../icons/logo'
import {TwitterIcon} from '../icons/twitter-icon'

function Footer() {
  const {navigation, social} = useGlobal()

  const items = [...(navigation?.main ?? []), ...(navigation?.actions ?? [])]

  const github = social?.github
  const twitter = social?.twitter

  return (
    <footer className="mt-32 px-5vw">
      <div className="mx-auto max-w-8xl border-t border-gray-300 py-24 dark:border-gray-700">
        <div>
          <Link
            className="flex flex-initial items-center font-bold md:mr-24"
            aria-label="home page"
            href="/"
          >
            <Logo className="h-14 w-14" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 border-primary-100 py-12 transition-colors duration-150 bg-primary text-primary lg:grid-cols-12">
          <div className="col-span-8">
            <div>
              {items.map(item => (
                <Link
                  key={item?.label}
                  href={item?.href ?? '/'}
                  isButton={item?.isButton}
                  className="mr-8 inline-block text-lg"
                  {...item}
                >
                  {item?.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex items-start text-primary lg:col-span-4 lg:justify-end">
            <div className="flex h-10 items-center space-x-4">
              {twitter ? (
                <a
                  rel="noreferrer noopener"
                  aria-label="Twitter feed"
                  target="_blank"
                  href={twitter}
                >
                  <TwitterIcon className="duration-75 ease-linear hover:scale-110" />
                </a>
              ) : null}
              {github ? (
                <Link aria-label="Github Repository" href={github}>
                  <GithubIcon className="duration-75 ease-linear hover:scale-110" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export {Footer}
