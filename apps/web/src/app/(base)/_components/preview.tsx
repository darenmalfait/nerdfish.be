'use client'

import * as React from 'react'
import {usePathname} from 'next/navigation'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {LogOut} from 'lucide-react'

function Preview() {
  const slug = usePathname()

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-end p-6 md:justify-start">
      <div className="flex items-center gap-x-2 rounded bg-pink-500 p-1 font-bold text-white shadow-lg">
        <span className="inline-block p-2">Preview Mode</span>
        <a
          href={`/admin/index.html#/logout?slug=/api/preview/exit?slug=/${stripPreSlash(
            slug ?? '',
          )}`}
          className="pointer-events-auto flex items-center gap-x-1 rounded p-2 px-3 hover:bg-pink-600"
        >
          <LogOut className="h-auto w-4" /> Exit
        </a>
      </div>
    </div>
  )
}

export {Preview}
