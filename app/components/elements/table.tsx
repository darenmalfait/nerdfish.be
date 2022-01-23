import clsx from 'clsx'
import * as React from 'react'

import { Cta } from '~/components/buttons'
import type { SanityCta, SanityTable } from '~/types/sanity'

interface TableProps {
  title?: string
  table?: SanityTable
  cta?: SanityCta
  children?: React.ReactNode
}

const row = 'h-10 text-sm text-primary!'
const cell = 'px-4! align-middle text-left text-primary'

function Table({ children, table, title, cta }: TableProps) {
  if (!table || table.rows?.length === 0) {
    return null
  }

  const { rows = [] } = table
  if (!rows) {
    return null
  }

  const headerCells = rows[0]?.cells || []
  const itemRows = [...rows.slice(1)]

  return (
    <div className="overflow-hidden w-full rounded-lg">
      <div className="justify-between items-center py-4 sm:flex md:py-3 text-primary!">
        <div>
          <h2 className="text-base font-bold leading-normal sm:text-lg md:text-xl lg:text-2xl mt-0! text-primary sm:my-0!">
            {title}
          </h2>
          {children}
        </div>
        {cta && cta.title && (
          <div>
            <Cta {...cta} />
          </div>
        )}
      </div>
      <div className="overflow-y-auto pb-4 shadow">
        <table className="w-full whitespace-nowrap m-0!">
          <thead>
            <tr className={clsx(row, 'w-full border-b-2')}>
              {headerCells.map((title, i) => (
                <th
                  className={clsx(cell, 'font-bold align-middle text-primary')}
                  key={i}
                >
                  {title || 'headercol'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {itemRows.map(row => {
              const { cells = [], _key: key } = row

              return (
                <tr className={clsx(row, 'px-2 border-y')} key={key}>
                  {cells &&
                    cells.map((value, j) => (
                      <td className={cell} key={j}>
                        {value}
                      </td>
                    ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { Table }
