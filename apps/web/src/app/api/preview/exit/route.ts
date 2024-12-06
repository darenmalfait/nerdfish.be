import { redirect } from 'next/navigation'
import { disableDraftMode } from '~/app/cms/actions'

export async function GET() {
	await disableDraftMode()

	return redirect('/')
}
