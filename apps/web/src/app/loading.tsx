import { LoadingAnimation } from '@nerdfish/ui'
import { WordRotate } from '@nerdfish-website/ui/components'

export default function WebLoading() {
	return (
		<div className="bg-popover fixed inset-0 z-50 flex flex-col items-center justify-center gap-2">
			<LoadingAnimation />
			<WordRotate
				words={[
					'Loading front-end knowledge',
					'Loading back-end knowledge',
					'Loading full-stack knowledge',
					'Loading soft-skills',
					'Loading design skills',
				]}
			/>
		</div>
	)
}
