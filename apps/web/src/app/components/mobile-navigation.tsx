'use client'

import * as React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {Icons} from '@nerdfish-website/ui/icons'
import {Button, Drawer, H2, H3, ScrollArea} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'

import {type GlobalNavigationMain, type GlobalNavigationMainSub} from '../cms'
import {useGlobal} from '../global-provider'
import {ActionsNavigation, RSSFeedButton, SocialLinks} from './navigation'
import {ThemeToggle} from './theme-toggle'

const MobileNavigationSubItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & GlobalNavigationMainSub
>(({href, label, description, className, ...props}, ref) => {
  const pathname = usePathname()
  const isActive = stripPreSlash(pathname).startsWith(href)

  return (
    <li>
      <Link ref={ref} href={`/${stripPreSlash(href)}`} {...props}>
        <H3
          className={cx(
            'hover:text-muted capitalize',
            isActive && 'text-muted',
          )}
          as="span"
        >
          {label}
        </H3>
      </Link>
    </li>
  )
})
MobileNavigationSubItem.displayName = 'MobileNavigationSubItem'

function MobileNavigationItem({
  href,
  label,
  sub,
  onClick,
}: GlobalNavigationMain & {
  onClick: () => void
}) {
  const pathname = usePathname()
  if (!sub?.length && !href) return null

  if (!sub?.length) {
    const isActive = stripPreSlash(pathname).startsWith(href ?? '')

    return (
      <Link href={`/${stripPreSlash(href ?? '')}`} onClick={onClick}>
        <H2
          className={cx(
            'hover:text-muted capitalize',
            isActive && 'text-muted',
          )}
          blurredClassName="hidden"
          variant="primary"
          as="span"
        >
          {label}
        </H2>
      </Link>
    )
  }

  return (
    <div>
      <H2
        className="capitalize"
        blurredClassName="hidden"
        variant="primary"
        as="span"
      >
        {label}
      </H2>
      <ul className="mt-3 grid gap-3">
        {sub.map(subNavItem => {
          if (!subNavItem) return null

          return (
            <MobileNavigationSubItem
              key={subNavItem.label}
              {...subNavItem}
              onClick={onClick}
            />
          )
        })}
      </ul>
    </div>
  )
}

export function MobileNavigation() {
  const {navigation} = useGlobal()
  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <Drawer direction="top" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button
          className="lg:hidden"
          variant="ghost"
          type="button"
          size="icon"
          aria-label="Toggle navigation"
        >
          <Icons.Hamburger className="size-4" />
        </Button>
      </Drawer.Trigger>
      <Drawer.Content className="dark:bg-popover">
        <ScrollArea className="h-[85vh] w-full md:h-auto">
          <div className="container mx-auto flex flex-col gap-12 px-4 py-6">
            <div className="flex items-center justify-between gap-2">
              <Link href="/" aria-label="Home" onClick={() => setOpen(false)}>
                <Icons.Logo className="h-5 w-auto transition-transform hover:scale-105" />
              </Link>
              <div className="flex flex-row items-center justify-end gap-2">
                <ThemeToggle variant="ghost" />
                <RSSFeedButton />
                <ActionsNavigation
                  onSelect={() => {
                    setOpen(false)
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {navigation?.main?.map(navItem => {
                if (!navItem) return null

                return (
                  <MobileNavigationItem
                    key={navItem.label}
                    {...navItem}
                    onClick={() => setOpen(false)}
                  />
                )
              })}
            </div>

            <div className="flex gap-2">
              <div className="flex flex-row items-center gap-3">
                <span className="font-bold">Socials:</span>
                <SocialLinks />
              </div>
            </div>
          </div>
        </ScrollArea>
      </Drawer.Content>
    </Drawer>
  )
}
