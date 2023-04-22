import {ThemeToggle} from '~/components/common/theme-toggle'
import {useGlobal} from '~/context/global-provider'

import {Link} from '../common/link'
import {GithubIcon} from '../icons/github-icon'
import {Logo} from '../icons/logo'
import {TwitterIcon} from '../icons/twitter-icon'

function Footer({hideThemeToggle}: {hideThemeToggle?: boolean}) {
  const {social} = useGlobal()

  const github = social?.github
  const twitter = social?.twitter

  return (
    <footer className="px-5vw text-primary mt-24 pb-8 md:pb-20">
      <div className="flex flex-col items-center justify-between gap-8 border-t border-gray-100 pt-8 dark:border-white/10 md:flex-row md:items-start md:pt-16">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:items-start md:text-left">
          <div className="flex h-12 items-center">
            <Logo className="relative h-6 w-auto rounded-full border-2 border-white dark:border-[#111]" />
          </div>
          <div className="space-y-4 divide-y divide-gray-100 dark:divide-white/10">
            <p className="max-w-md">
              <b className="font-semibold">
                Made by{' '}
                <Link
                  className="underline"
                  href={twitter ?? github ?? 'https://www.nerdfish.be'}
                >
                  nerdfish
                </Link>
              </b>
              , development with user experience in mind.
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3 md:gap-7">
          {!hideThemeToggle ? (
            <ThemeToggle className="hover:bg-github/20 flex h-10 w-10 items-center justify-center rounded-full transition" />
          ) : null}

          {twitter ? (
            <Link
              className="focus-ring hover:bg-twitter/20 flex h-10 w-10 items-center justify-center rounded-full transition"
              aria-label="Twitter feed"
              href={twitter}
            >
              <TwitterIcon className="duration-75 ease-linear" />
            </Link>
          ) : null}
          {github ? (
            <Link
              className="focus-ring hover:bg-github/20 flex h-10 w-10 items-center justify-center rounded-full transition"
              aria-label="Github Repository"
              href={github}
            >
              <GithubIcon className="duration-75 ease-linear" />
              <span className="sr-only">Github</span>
            </Link>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

export {Footer}
