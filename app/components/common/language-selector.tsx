import { Popover, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Form, useLocation } from 'remix'

import languages from '../../../config/languages'

function LanguageSelector() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  return (
    <Popover
      className="inline-block relative"
      as={Form}
      method="post"
      action="/actions/set-language"
      replace
    >
      {({ open, close }) => (
        <>
          <input
            type="hidden"
            name="redirect"
            value={location.pathname + location.search}
          />

          <Popover.Button
            data-testid="language-selector"
            className="inline-flex items-center p-2 px-3 rounded-lg border border-primary-200 transition-colors hover:border-primary focus:border-primary"
          >
            <span className="sr-only">{t('change-language')}</span>
            {i18n.language}
            <ChevronUpIcon
              className={clsx(
                'ml-2 w-6 h-6 transition-transform',
                open && 'rotate-180',
              )}
            />
          </Popover.Button>

          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel className="absolute bottom-full left-0 z-10 p-2 my-3 min-w-max dark:bg-gray-800 rounded shadow-lg lg:right-0 lg:left-auto bg-primary">
              <ul>
                {languages.map(({ code, label }) => (
                  <li key={code}>
                    <button
                      name="lang"
                      value={code}
                      className="flex items-center p-2 w-full hover:bg-primary-600 focus:bg-primary-600 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                      onClick={() => close()}
                    >
                      <span className="ml-2">{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export { LanguageSelector }
