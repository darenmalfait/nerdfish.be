import type {ExtractProps} from '@daren/ui-components'
import {Combobox, Dialog, Transition} from '@headlessui/react'
import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import {NoResultIcon} from 'components/icons/no-result-icon'
import * as React from 'react'
import type {Hit} from 'react-instantsearch-core'
import {
  InstantSearch,
  useHits,
  useSearchBox,
  Configure,
  Highlight,
} from 'react-instantsearch-hooks-web'

import {getAlgoliaClient} from '../../lib/services/search'
import {stripPreSlash} from '../../lib/utils/string'

type SearchItem = {
  title?: string
  slug: string
  type?: string
}

const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? ''
const searchClient = getAlgoliaClient().algoliaClient

function SearchResult({
  item,
  resultIndex,
  ...props
}: {item: Hit<SearchItem>} & Pick<
  ExtractProps<typeof Combobox.Option>,
  'tabIndex'
> & {
    resultIndex: number
  }) {
  return (
    <Combobox.Option
      {...props}
      value={item}
      className={({active}) =>
        clsx(
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
          highlighted: 'bg-transparent text-success underline',
        }}
        hit={item as any}
      />

      {item.type ? (
        <div
          id={`${item.objectID}-type`}
          aria-hidden="true"
          className="text-2xs mt-1 truncate whitespace-nowrap text-secondary"
        >
          {item.type}
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
        <div className="p-6 text-center font-fallback">
          <NoResultIcon className="mx-auto h-5 w-5 stroke-gray-900 dark:stroke-white" />
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
          className="max-h-72 scroll-py-2 overflow-y-auto py-2 font-fallback text-sm text-primary"
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
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
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
            className={clsx('fixed inset-0 bg-black transition-opacity ', {
              'opacity-25 dark:opacity-70': open,
              'opacity-0': !open,
            })}
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 font-fallback sm:p-6 md:p-20">
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
                    className="h-12 w-full rounded-lg border-0 bg-primary-600 pr-11 pl-4 font-bold text-black outline-none placeholder:text-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Search components..."
                    onChange={event => refine(event.currentTarget.value)}
                  />
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 right-4 h-5 w-5 text-gray-400"
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

function SearchComponent() {
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
      <button
        type="button"
        className="flex items-center justify-center rounded-full p-2 font-fallback focus-ring"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlassIcon className="w-5" />
        <div className="sr-only">Search</div>
      </button>
      <SearchDialog open={open} setOpen={setOpen} />
    </>
  )
}

function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
      <Configure hitsPerPage={5} />
      <SearchComponent />
    </InstantSearch>
  )
}

export {Search}
