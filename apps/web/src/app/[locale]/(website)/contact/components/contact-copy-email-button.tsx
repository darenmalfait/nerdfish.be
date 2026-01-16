'use client'

import { useCopyToClipboard } from '@nerdfish/react/hooks/use-copy-to-clipboard'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@nerdfish/react/tooltip'
import { MagnetButton } from '@repo/design-system/components/magnet'
import { ClipboardIcon, MailIcon } from '@repo/design-system/icons'
import { companyInfo } from '@repo/global-settings/company-info'
import { useTranslations } from '@repo/i18n/client'
import { cn } from '@repo/lib/utils/class'

export function ContactCopyEmailButton() {
	const { handleCopy, copiedText } = useCopyToClipboard()
	const t = useTranslations('contact.page.copyEmailButton')

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					render={
						<MagnetButton
							size="xl"
							variant="ghost"
							className={cn(
								'mt-acquaintances group flex items-center',
								copiedText && 'text-success',
							)}
							onClick={() => handleCopy(companyInfo.email, 3000)}
						>
							{copiedText ? (
								<>
									<ClipboardIcon />
									<span>{t('copied')}</span>
								</>
							) : (
								<>
									<MailIcon />
									<span className="sr-only">{t('copy')}</span>
									<span>{companyInfo.email}</span>
								</>
							)}
						</MagnetButton>
					}
				/>
				<TooltipContent>{copiedText ? t('copied') : t('copy')}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
