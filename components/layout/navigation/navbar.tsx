'use client'

import * as React from 'react'
import {Container, Grid} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'
import {Rss} from 'lucide-react'

import {Hamburger} from '~/components/common/hamburger'
import {Link} from '~/components/common/link'
import {Overlay} from '~/components/common/overlay'
import {Search} from '~/components/common/search'
import {ThemeToggle} from '~/components/common/theme-toggle'
import {Logo} from '~/components/icons/logo'
import {getDomainUrl} from '~/lib/utils/misc'
import {useClickOutside} from '~/lib/utils/use-click-outside'

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
      className={cx(
        'inset-[0px 0px auto] fixed top-0 right-0 z-30 h-screen w-full max-w-screen-sm transition-transform bg-primary',
        {
          'translate-x-0 shadow-2xl': open,
          'translate-x-full shadow-none': !open,
        },
      )}
    >
      <div className="px-5vw py-9 lg:py-12">
        <div className="max-w-8xl text-primary mx-auto flex items-center justify-between">
          <a
            aria-label="home page"
            className="text-primary w-2/5"
            href={rootPath}
          >
            <Logo className="h-5 w-auto text-white transition-transform hover:scale-110" />
          </a>
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
  hideThemeToggle?: boolean
  className?: string
}

function Navbar({
  actions,
  children,
  rootPath = getDomainUrl(),
  className,
  hideThemeToggle,
}: NavbarProps) {
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
    <div className={cx('w-full', className)}>
      <div className="py-9 lg:py-12">
        <Grid className="text-primary mx-auto">
          <Container size="full">
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                <a
                  className="text-primary-700 order-first flex items-center space-x-4 md:mb-0 lg:order-none lg:w-1/5 lg:items-center lg:justify-start"
                  aria-label="home page"
                  href={rootPath ?? '/'}
                >
                  <Logo className="h-5 w-auto transition-transform hover:scale-105" />
                </a>
              </div>
              <div className="hidden flex-1 justify-end md:justify-center lg:flex">
                <nav className="flex rounded-full px-3 text-sm font-medium text-zinc-800 dark:text-zinc-200  lg:space-x-2">
                  {children}
                </nav>
              </div>
              <div className="flex justify-end md:flex-1">
                <nav className="ml-5 inline-flex items-center space-x-4 lg:ml-0 lg:w-2/5 lg:justify-end lg:space-y-0">
                  <Search />
                  {!hideThemeToggle ? <ThemeToggle /> : null}
                  <a
                    className="focus-ring xsm:block hidden rounded-full p-2"
                    target="_blank"
                    href="/rss.xml"
                    aria-label="rss feed"
                    rel="noreferrer"
                  >
                    <span className="sr-only">RSS feed</span>
                    <Rss className="w-5" />
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
        rootPath={rootPath ?? '/'}
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

export {Navbar}
