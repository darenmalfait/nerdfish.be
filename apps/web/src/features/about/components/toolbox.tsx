'use client'

import { useState } from 'react'
import { TagFilterTitle } from '@repo/design-system/components/tag-filter'
import { useTranslations } from '@repo/i18n/client'

import { SkillsFilter, skills, SkillItem, Skills } from '~/components/skills'

export function Toolbox() {
	const t = useTranslations('about.page.my-toolbox')

	const [selectedSkills, setSelectedSkills] = useState<string[]>([])

	const filteredSkills =
		selectedSkills.length > 0
			? skills.filter((skill) =>
					selectedSkills.some((selected) => skill.category.includes(selected)),
				)
			: skills

	return (
		<div className="gap-acquaintances flex flex-col">
			<div>
				<SkillsFilter
					selectedTags={selectedSkills}
					onToggleTag={(category) => setSelectedSkills([category])}
					enabledTags={skills.map((skill) => skill.category).flat()}
					onClear={() => setSelectedSkills([])}
					clearLabel={t('clear-filter')}
				>
					<TagFilterTitle>Filter skills by category</TagFilterTitle>
				</SkillsFilter>
			</div>
			<div>
				<Skills>
					{filteredSkills.map((skill) => (
						<SkillItem key={skill.name} skill={skill.name} />
					))}
				</Skills>
			</div>
		</div>
	)
}
