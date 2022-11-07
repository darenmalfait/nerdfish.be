import { useGlobal } from '../../context/global-provider'
import { Link } from '../common/link'
import { GithubIcon } from '../icons/github-icon'
import { Logo } from '../icons/logo'
import { TwitterIcon } from '../icons/twitter-icon'

function Footer() {
  const { navigation, social } = useGlobal()

  const items = [...(navigation?.main || []), ...(navigation?.actions || [])]

  const github = social?.github
  const twitter = social?.twitter

  return (
    <footer className="px-5vw mt-32">
      <div className="py-24 mx-auto max-w-8xl border-t border-gray-300 dark:border-gray-700">
        <div>
          <Link
            className="flex flex-initial items-center font-bold md:mr-24"
            aria-label="home page"
            href="/"
          >
            <Logo className="w-14 h-14" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 py-12 border-primary-100 transition-colors duration-150 lg:grid-cols-12 bg-primary text-primary">
          <div className="col-span-8">
            <div>
              {items.map(item => (
                <Link
                  key={item?.label}
                  href={item?.href || '/'}
                  isButton={item?.isButton}
                  className="inline-block mr-8 text-lg"
                  {...item}
                >
                  {item?.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex col-span-2 items-start lg:col-span-4 lg:justify-end text-primary">
            <div className="flex items-center space-x-4 h-10">
              {twitter && (
                <a
                  rel="noreferrer noopener"
                  aria-label="Twitter feed"
                  target="_blank"
                  href={twitter}
                >
                  <TwitterIcon className="duration-75 ease-linear hover:scale-110" />
                </a>
              )}
              {github && (
                <Link aria-label="Github Repository" href={github}>
                  <GithubIcon className="duration-75 ease-linear hover:scale-110" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
