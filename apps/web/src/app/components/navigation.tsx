'use client'

import * as React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {Icons} from '@nerdfish-website/ui/icons'
import {Button, NavigationMenu} from '@nerdfish/ui'
import {cva, cx} from '@nerdfish/utils'

import {type GlobalNavigationMain, type GlobalNavigationMainSub} from '../cms'
import {useGlobal} from '../global-provider'

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
      {navigation?.actions?.map(link => {
        if (!link) return null

        return (
          <Button key={link.label} onClick={onSelect} asChild>
            <Link href={`/${stripPreSlash(link.href)}`}>{link.label}</Link>
          </Button>
        )
      })}
    </div>
  )
}

const MainNavigationSubItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & GlobalNavigationMainSub
>(({href, label, description, className, ...props}, ref) => {
  return (
    <li>
      <NavigationMenu.Item>
        <NavigationMenu.Link asChild>
          <Link
            className={cx(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-inverted/5 dark:hover:bg-inverted/15 focus:bg-inverted/5 dark:focus:bg-inverted/15',
              className,
            )}
            ref={ref}
            href={`/${stripPreSlash(href)}`}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{label}</div>
            {description ? (
              <p className="line-clamp-2 text-sm leading-snug text-muted">
                {description}
              </p>
            ) : null}
          </Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </li>
  )
})
MainNavigationSubItem.displayName = 'MainNavigationSubItem'

const getMainItemClassName = cva(
  'relative flex h-8 cursor-pointer items-center gap-x-1.5 whitespace-nowrap rounded-full px-3 capitalize outline-none !ring-muted transition active-ring after:rounded-full focus-within:ring-2 active:bg-inverted/10 sm:h-10 sm:px-4',
  {
    variants: {
      variant: {
        default: 'hover:bg-muted',
        active:
          'bg-primary px-3 text-primary shadow-outline hover:bg-muted hover:text-primary/90',
      },
    },
  },
)

function MainNavigationItem({href, label, sub}: GlobalNavigationMain) {
  const pathname = usePathname()
  if (!sub?.length && !href) return null

  if (!sub?.length) {
    const isActive = stripPreSlash(pathname).startsWith(href ?? '')

    return (
      <NavigationMenu.Item>
        <NavigationMenu.Link asChild>
          <Link
            href={`/${stripPreSlash(href ?? '')}`}
            className={getMainItemClassName({
              variant: isActive ? 'active' : 'default',
            })}
          >
            {label}
          </Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    )
  }

  const isActive = sub.some(subNavItem => {
    if (!subNavItem) return false

    return stripPreSlash(pathname).startsWith(subNavItem.href)
  })

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger
        className={getMainItemClassName({
          variant: isActive ? 'active' : 'default',
        })}
      >
        {label}
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
          {sub.map((subNavItem, i) => {
            if (!subNavItem) return null

            return <MainNavigationSubItem key={i} {...subNavItem} />
          })}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )
}

export function SocialLinks() {
  const {social} = useGlobal()

  return (
    <div className="flex flex-row items-center gap-3">
      {social?.twitter ? (
        <Button variant="ghost" size="icon" asChild>
          <Link aria-label="Twitter feed" href={social.twitter}>
            <Icons.Twitter className="size-4 duration-75 ease-linear" />
          </Link>
        </Button>
      ) : null}
      {social?.facebook ? (
        <Button variant="ghost" size="icon" asChild>
          <Link aria-label="Facebook page" href={social.facebook}>
            <Icons.Facebook className="size-4 duration-75 ease-linear" />
          </Link>
        </Button>
      ) : null}
      {social?.instagram ? (
        <Button variant="ghost" size="icon" asChild>
          <Link
            aria-label="Instagram
          "
            href={social.instagram}
          >
            <Icons.Instagram className="size-4 duration-75 ease-linear" />
          </Link>
        </Button>
      ) : null}
      {social?.linkedIn ? (
        <Button variant="ghost" size="icon" asChild>
          <Link aria-label="LinkedIn profile" href={social.linkedIn}>
            <Icons.LinkedIn className="size-4 duration-75 ease-linear" />
          </Link>
        </Button>
      ) : null}
      {social?.github ? (
        <Button variant="ghost" size="icon" asChild>
          <Link aria-label="Github Repository" href={social.github}>
            <Icons.GitHub className="size-4 duration-75 ease-linear" />
            <span className="sr-only">Github</span>
          </Link>
        </Button>
      ) : null}
    </div>
  )
}

export function MainNavigation() {
  const {navigation} = useGlobal()

  return (
    <NavigationMenu>
      <NavigationMenu.List className="gap-2">
        {navigation?.main?.map(mainNavItem => {
          if (!mainNavItem) return null

          return <MainNavigationItem key={mainNavItem.label} {...mainNavItem} />
        })}
      </NavigationMenu.List>
    </NavigationMenu>
  )
}
