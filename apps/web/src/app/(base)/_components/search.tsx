'use client'

import * as React from 'react'
import {Combobox, Dialog, Transition} from '@headlessui/react'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {Icons} from '@nerdfish-website/ui/icons'
import {Button} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'
import {Search as SearchIcon} from 'lucide-react'
import {
  Configure,
  Highlight,
  InstantSearch,
  useHits,
  useSearchBox,
} from 'react-instantsearch-hooks-web'

import {env} from '~/env.mjs'
import {getAlgoliaClient} from '~/lib/api/search'

type SearchItem = {
  title?: string
  slug: string
  type?: string
}

const INDEX_NAME = env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
const searchClient = getAlgoliaClient().algoliaClient

function SearchResult({
  item,
  resultIndex,
  ...props
}: {
  item: SearchItem & {
    objectID: string
    type?: string
  }
} & {
  tabIndex?: number
} & {
  resultIndex: number
}) {
  return (
    <Combobox.Option
      {...props}
      value={item}
      className={({active}) =>
        cx(
          'group block cursor-pointer px-4 py-3',
          resultIndex > 0 && 'border-t border-zinc-100 dark:border-zinc-800',
          active && 'bg-primary',
        )
      }
    >
      <Highlight
        attribute="title"
        classNames={{
          root: 'text-sm font-medium text-zinc-900 dark:text-white',
          highlighted: 'bg-transparent text-nerdfish-100 underline',
        }}
        hit={item as any}
      />

      {item.type ? (
        <div className="mt-1">
          <Highlight
            id={`${item.objectID}-type`}
            attribute="type"
            classNames={{
              root: 'text-2xs truncate whitespace-nowrap text-secondary',
              highlighted: 'bg-transparent text-nerdfish-100 underline',
            }}
            hit={item as any}
          >
            {item.type}
          </Highlight>
        </div>
      ) : null}
    </Combobox.Option>
  )
}

function SearchResults() {
  const {query} = useSearchBox()

  const transformItems = React.useCallback(
    (items: any[]) =>
      items.map(item => ({
        ...item,
      })),
    [],
  )

  const {hits} = useHits<SearchItem>({transformItems})

  return (
    <>
      {hits.length === 0 ? (
        <div className="font-fallback p-6 text-center">
          <Icons.NoResults className="mx-auto h-5 w-5 stroke-gray-900 dark:stroke-white" />
          <p className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">
            Nothing found for{' '}
            <strong className="break-words font-semibold text-zinc-900 dark:text-white">
              &lsquo;{query}&rsquo;
            </strong>
            . Please try again.
          </p>
        </div>
      ) : null}

      {hits.length > 0 ? (
        <Combobox.Options
          static
          className="font-fallback max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-primary"
        >
          {hits.map((hit, index) => (
            <SearchResult
              resultIndex={index}
              tabIndex={index}
              key={hit.objectID}
              item={hit as any}
            />
          ))}
        </Combobox.Options>
      ) : null}
    </>
  )
}

function SearchDialog({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const {refine, query} = useSearchBox()

  return (
    <Transition.Root show={open} as={React.Fragment} appear>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={cx('fixed inset-0 bg-black transition-opacity ', {
              'opacity-25 dark:opacity-70': open,
              'opacity-0': !open,
            })}
          />
        </Transition.Child>

        <div className="font-fallback fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="group mx-auto max-w-xl rounded-xl shadow-2xl transition-all bg-secondary">
              <Combobox
                onChange={(item: SearchItem) => {
                  window.location = `/${stripPreSlash(
                    item.slug,
                  )}` as unknown as Location
                  setOpen(false)
                }}
              >
                <div className="relative">
                  <Combobox.Input
                    id="algolia_search"
                    type="search"
                    className="h-12 w-full rounded-lg border-0 bg-primary-600 pl-4 pr-11 font-bold text-black outline-none placeholder:text-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Search website..."
                    onChange={event => refine(event.currentTarget.value)}
                  />
                  <SearchIcon
                    className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>

                {query.length > 0 ? <SearchResults /> : null}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function SearchComponent({className}: {className?: string}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className={cx('active-ring', className)}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="w-4" />
        <div className="sr-only">Search</div>
      </Button>
      <SearchDialog open={open} setOpen={setOpen} />
    </>
  )
}

function Search({className}: {className?: string}) {
  return (
    <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
      <Configure />
      <SearchComponent className={className} />
    </InstantSearch>
  )
}

export {Search}
