'use client'

import { Button } from '@nerdfish/ui'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { disableDraftMode } from '../actions'

function Preview() {
	const router = useRouter()
	const [pending, startTransition] = React.useTransition()

	return (
		<div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-end p-6 md:justify-start">
			<div className="flex items-center gap-x-2 rounded bg-pink-500 p-1 font-bold text-white shadow-lg">
				<span className="inline-block p-2">Preview Mode</span>
				<Button
					variant="outline"
					disabled={pending}
					onClick={() =>
						startTransition(() =>
							disableDraftMode().then(() => {
								router.refresh()
							})
						)
					}
					className="pointer-events-auto"
				>
					{pending ? (
						'Exiting'
					) : (
						<>
							<LogOut className="h-auto w-4" /> Exit
						</>
					)}
				</Button>
			</div>
		</div>
	)
}

export { Preview }
