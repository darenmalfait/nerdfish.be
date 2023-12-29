'use client'

import * as React from 'react'
import {motion, MotionConfig, useReducedMotion} from 'framer-motion'

import {Footer} from './footer'
import {Header} from './header'
import {NavigationGrid} from './navigation'

export function BaseLayoutTemplate({children}: {children: React.ReactNode}) {
  const panelId = React.useId()
  const [expanded, setExpanded] = React.useState(false)
  const openRef = React.useRef<React.ElementRef<'button'>>(null)
  const closeRef = React.useRef<React.ElementRef<'button'>>(null)
  const navRef = React.useRef<React.ElementRef<'div'>>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <MotionConfig transition={shouldReduceMotion ? {duration: 0} : undefined}>
      <div className="bg-gray-900 dark:bg-gray-800">
        <header>
          <div
            className="absolute inset-x-0 top-2 z-40 pt-14"
            aria-hidden={expanded ? 'true' : undefined}
            // @ts-expect-error (https://github.com/facebook/react/issues/17157)
            inert={expanded ? '' : undefined}
          >
            <Header
              panelId={panelId}
              toggleRef={openRef}
              expanded={expanded}
              onToggle={() => {
                setExpanded(value => !value)
                window.setTimeout(
                  () => closeRef.current?.focus({preventScroll: true}),
                )
              }}
            />
          </div>

          <motion.div
            layout
            id={panelId}
            style={{height: expanded ? 'auto' : '0.5rem'}}
            className="relative z-50 overflow-hidden bg-gray-900 pt-2 dark:bg-gray-800"
            aria-hidden={expanded ? undefined : 'true'}
            // @ts-expect-error (https://github.com/facebook/react/issues/17157)
            inert={expanded ? undefined : ''}
          >
            <motion.div layout className="bg-gray-900 dark:bg-gray-800">
              <div ref={navRef} className="pb-16 pt-14">
                <Header
                  invert
                  panelId={panelId}
                  toggleRef={closeRef}
                  expanded={expanded}
                  onToggle={() => {
                    setExpanded(value => !value)
                    window.setTimeout(
                      () => openRef.current?.focus({preventScroll: true}),
                    )
                  }}
                />
              </div>
              <NavigationGrid />
              <div className="pb-12" />
            </motion.div>
          </motion.div>
        </header>

        <motion.div
          layout
          className="relative flex flex-auto overflow-hidden rounded-3xl pt-14 bg-primary"
        >
          <motion.div
            layout
            className="relative isolate flex w-full flex-col pt-24"
          >
            <main className="w-full flex-auto">{children}</main>

            <Footer />
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  )
}
