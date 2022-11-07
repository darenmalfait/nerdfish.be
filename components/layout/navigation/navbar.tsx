import { Container, Grid } from '@daren/ui-components'
import { RssIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

import * as React from 'react'

import { Hamburger } from '../../../components/common/hamburger'
import { Link } from '../../../components/common/link'
import { Overlay } from '../../../components/common/overlay'
import { ThemeToggle } from '../../../components/common/theme-toggle'
import { Logo } from '../../../components/icons/logo'
import { useClickOutside } from '../../../lib/utils/use-click-outside'

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
        'inset-[0px 0px auto] fixed top-0 right-0 z-30 w-full max-w-screen-sm h-screen transition-transform bg-primary',
        {
          'shadow-2xl translate-x-0': open,
          'shadow-none translate-x-full': !open,
        },
      )}
    >
      <div className="py-9 px-5vw lg:py-12">
        <div className="flex justify-between items-center mx-auto max-w-8xl text-primary">
          <Link aria-label="home page" className="w-2/5" href={rootPath}>
            <Logo className="w-10 h-10 transition-transform hover:scale-110" />
          </Link>
          <Hamburger open={open} onClick={onClose} />
        </div>
      </div>
      <nav>
        <div className="mobile-nav-links flex flex-col pt-8">
          {children}
          {actions}
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
  const [open, setOpen] = React.useState(false)

  const onToggle = React.useCallback(() => {
    setOpen(current => !current)
  }, [setOpen])

  function navItems(items: React.ReactNode) {
    return React.Children.map(items, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          onClick: onToggle,
        } as any)
      }

      return child
    })
  }

  return (
    <div className="w-full">
      <div className="py-9 lg:py-12">
        <Grid className="mx-auto text-primary">
          <Container size="full">
            <div className="flex relative gap-4">
              <div className="flex flex-1">
                <Link
                  className="flex order-first items-center space-x-4 text-primary-700 md:mb-0 lg:order-none lg:justify-start lg:items-center lg:w-1/5"
                  aria-label="home page"
                  href={rootPath}
                >
                  <Logo className="w-10 h-10 transition-transform hover:scale-105" />
                </Link>
              </div>
              <div className="hidden flex-1 justify-end md:justify-center lg:flex">
                <nav className="flex px-3 text-sm font-medium text-zinc-800 dark:text-zinc-200 bg-white/90 dark:bg-zinc-800/90 rounded-full ring-1 ring-zinc-900/5 dark:ring-white/10 shadow-lg shadow-zinc-800/5 backdrop-blur">
                  {children}
                </nav>
              </div>
              <div className="flex justify-end md:flex-1">
                <nav className="inline-flex items-center ml-5 space-x-4 lg:justify-end lg:ml-0 lg:space-y-0 lg:w-2/5">
                  <ThemeToggle />
                  <a
                    className="hidden p-2 rounded-full xsm:block focus-ring"
                    target="_blank"
                    href="/rss.xml"
                    aria-label="rss feed"
                    rel="noreferrer"
                  >
                    <span className="sr-only">RSS feed</span>
                    <RssIcon className="w-5" />
                  </a>
                  <div className="hidden space-x-3 sm:flex">{actions}</div>
                  <Hamburger open={open} onClick={onToggle} />
                </nav>
              </div>
            </div>
          </Container>
        </Grid>
      </div>
      <MobileNav
        rootPath={rootPath}
        actions={navItems(actions)}
        onClose={onToggle}
        open={open}
      >
        {navItems(children)}
      </MobileNav>
      <Overlay open={open} />
    </div>
  )
}

Navbar.Link = Link

export { Navbar }
