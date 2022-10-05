import { Grid, H2 } from '@daren/ui-components'
import {
  Tabs,
  Tab as ReachTab,
  TabProps,
  TabList,
  TabPanels,
  TabPanel,
} from '@reach/tabs'
import type { PortableTextEntry } from '@sanity/block-content-to-react'
import clsx from 'clsx'

import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'

import { CtaLink } from '~/components/buttons'

import { PortableText } from '~/components/common'
import { ArrowIcon } from '~/components/icons/arrow-icon'
import { Section } from '~/components/layout'
import type { SanityBlock, SanityCta } from '~/types/sanity'

function Tab({ isSelected, children }: TabProps & { isSelected?: boolean }) {
  return (
    <ReachTab
      className={clsx(
        'inline-flex items-center p-0 w-full focus:bg-transparent border-none transition hover:text-primary',
        {
          'text-primary': isSelected,
          'text-gray-400 dark:text-white': !isSelected,
        },
      )}
    >
      <span>{children}</span>
      <AnimatePresence>
        {isSelected ? (
          <motion.span
            className="hidden items-center mt-4 ml-8 h-12 lg:flex lg:mt-0"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.15 } }}
            exit={{ x: 20, opacity: 0, transition: { duration: 0.15 } }}
          >
            <ArrowIcon size={54} direction="right" />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </ReachTab>
  )
}

function ContentPanel({
  children,
  active,
}: {
  children: React.ReactNode | React.ReactNode[]
  active: boolean
}) {
  return (
    <TabPanel className="block col-start-1 row-start-1">
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="prose"
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </TabPanel>
  )
}

interface CarouselItemProps {
  title: string
  body?: PortableTextEntry[]
  action?: SanityCta
}

interface ContentProps {
  items?: CarouselItemProps[]
}

export function CarouselBlock({
  content: { items = [] } = {},
}: SanityBlock<ContentProps>) {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0)

  return (
    <Section>
      <Tabs
        as={Grid}
        featured
        onChange={index => setActiveTabIndex(index)}
        className="p-8 lg:p-16 xl:p-24 bg-secondary"
      >
        <div className="overflow-auto order-1 col-span-full col-start-1 lg:overflow-hidden lg:order-3 lg:col-span-5">
          <TabList className="inline-flex flex-row space-x-8 text-xl leading-snug text-white bg-transparent lg:flex-col lg:space-y-6 lg:space-x-0 lg:text-5xl 2xl:text-7xl">
            {items.map(({ title }) => (
              <Tab key={title}>{title}</Tab>
            ))}
          </TabList>
        </div>

        <TabPanels className="grid order-4 col-span-full mt-16 lg:col-span-5 lg:col-start-7 lg:mt-0">
          {items.map(({ title, body, action }, idx) => {
            return (
              <ContentPanel key={title} active={activeTabIndex === idx}>
                <H2>{title}</H2>
                {body && <PortableText blocks={body} />}
                {action && <CtaLink {...action} />}
              </ContentPanel>
            )
          })}
        </TabPanels>
      </Tabs>
    </Section>
  )
}
