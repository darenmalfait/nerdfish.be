import { RssIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import * as React from 'react'
import { Link } from 'remix'

import { CtaLink, Hamburger } from '~/components/buttons'
import { Logo } from '~/components/common'
import { ThemeToggle } from '~/components/common/theme-toggle'
import { Overlay } from '~/components/layout'
import { useTranslations } from '~/context/translations-provider'
import { useClickOutside } from '~/hooks/use-click-outside'

interface MobileNavProps {
  actions?: React.ReactNode
  open: boolean
  onClose(): void
  rootPath: string
  children?: React.ReactNode
}

function MobileNav({
  rootPath,
  actions,
  open,
  children,
  onClose,
}: MobileNavProps) {
  const ref = useClickOutside(open ? onClose : undefined)

  React.useEffect(() => {
    if (open) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add('fixed')
      document.body.classList.add('overflow-y-scroll')
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.height = '100vh'
    } else {
      document.body.classList.remove('fixed')
      document.body.classList.remove('overflow-y-scroll')
      document.body.style.removeProperty('height')
    }
  }, [open])

  return (
    <div
      ref={open ? ref : null}
      className={clsx(
        'fixed top-0 right-0 z-30 w-full max-w-screen-sm h-screen transition-transform inset-[0px 0px auto] bg-primary',
        {
          'shadow-2xl translate-x-0': open,
          'shadow-none translate-x-full': !open,
        },
      )}
    >
      <div className="py-9 px-5vw lg:py-12">
        <div className="flex justify-between items-center mx-auto max-w-8xl text-primary">
          <Link aria-label="home page" className="w-2/5" to={rootPath}>
            <Logo className="w-10 h-10 transition-transform hover:scale-110" />
          </Link>
          <Hamburger open={open} onClick={onClose} />
        </div>
      </div>
      <nav>
        <div className="flex flex-col pt-8 mobile-nav-links">
          {children}
          {actions && actions}
        </div>
      </nav>
    </div>
  )
}

interface NavbarProps {
  rootPath?: string
  children?: React.ReactNode
  actions?: React.ReactNode
}

function Navbar({ actions, children, rootPath = '/' }: NavbarProps) {
  const { currentLanguage } = useTranslations()
  const [open, setOpen] = React.useState(false)

  const onToggle = React.useCallback(() => {
    setOpen(current => !current)
  }, [setOpen])

  return (
    <div className="w-full">
      <div className="py-9 px-5vw lg:py-12">
        <div className="flex justify-between items-center mx-auto max-w-8xl text-primary">
          <nav className="hidden flex-wrap items-center text-base md:flex md:ml-auto md:space-x-4 lg:w-2/5">
            {children}
          </nav>
          <Link
            prefetch="intent"
            className="flex order-first items-center space-x-4 text-primary-700 md:mb-0 lg:order-none lg:justify-center lg:items-center lg:w-1/5"
            aria-label="home page"
            to={rootPath}
          >
            <Logo className="w-10 h-10 transition-transform hover:scale-105" />
          </Link>
          <nav className="inline-flex items-center ml-5 space-x-4 lg:justify-end lg:ml-0 lg:space-y-0 lg:w-2/5">
            <ThemeToggle />
            <a
              className="p-2 rounded-full focus-ring"
              target="_blank"
              href={`/${currentLanguage}/blog/rss.xml`}
              rel="noreferrer"
            >
              <RssIcon className="w-5" />
            </a>
            {actions}
            <Hamburger open={open} onClick={onToggle} />
          </nav>
        </div>
      </div>
      <MobileNav
        rootPath={rootPath}
        actions={React.Children.map(actions, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onClick: onToggle,
            })
          }

          return child
        })}
        onClose={onToggle}
        open={open}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onClick: onToggle,
            })
          }

          return child
        })}
      </MobileNav>
      <Overlay open={open} />
    </div>
  )
}

Navbar.Link = CtaLink

export { Navbar }
