'use client'

import * as React from 'react'
import Link from 'next/link'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {ClientOnly} from '@nerdfish-website/ui/components/client-only'
import {Icons} from '@nerdfish-website/ui/icons'
import {Button, Drawer, H2} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'

import {useGlobal} from '../global-provider'
import {ThemeToggle} from './theme-toggle'

const NavigationItem = React.forwardRef(
  (
    {href, children, ...props}: React.ComponentPropsWithRef<'a'>,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    return (
      <Link href={`/${stripPreSlash(href ?? '')}`} ref={ref} {...props}>
        <H2
          className="hover:text-muted"
          blurredClassName="hidden"
          variant="primary"
          as="span"
        >
          {children}
        </H2>
      </Link>
    )
  },
)
NavigationItem.displayName = 'NavigationItem'

export function RSSFeedButton({className}: {className?: string}) {
  return (
    <Button variant="ghost" size="icon" className={className} asChild>
      <a target="_blank" href="/rss.xml" aria-label="rss feed" rel="noreferrer">
        <span className="sr-only">RSS feed</span>
        <Icons.Rss className="size-4" />
      </a>
    </Button>
  )
}

export function ActionsNavigation({
  className,
  onSelect,
}: {
  className?: string
  onSelect?: () => void
}) {
  const {navigation} = useGlobal()

  return (
    <div className={cx('space-x-3', className)}>
      {navigation?.actions?.map((link, i: number) => {
        if (!link) return null

        return (
          <Button key={i} onClick={onSelect} asChild>
            <Link href={`/${stripPreSlash(link.href)}`}>{link.label}</Link>
          </Button>
        )
      })}
    </div>
  )
}

export function MobileNavigation() {
  const {navigation} = useGlobal()
  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <ClientOnly>
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
        <Drawer.Content>
          <div className="flex flex-col gap-12 py-6">
            <div className="container m-auto flex flex-col items-center justify-center gap-6">
              {navigation?.main?.map((link, i: number) => {
                if (!link) return null

                return (
                  <NavigationItem
                    key={i}
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavigationItem>
                )
              })}
            </div>
            <div className="flex justify-center space-x-2 md:flex-1">
              <ThemeToggle variant="ghost" />
              <RSSFeedButton />
              <ActionsNavigation
                onSelect={() => {
                  setOpen(false)
                }}
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer>
    </ClientOnly>
  )
}
