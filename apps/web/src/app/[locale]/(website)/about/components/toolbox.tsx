'use client'

import { Button } from '@nerdfish/react/button'
import { TagFilterTitle } from '@repo/design-system/components/tag-filter'
import { useTranslations } from '@repo/i18n/client'
import { useState } from 'react'
import {
	SkillsFilter,
	skills,
	SkillItem,
	Skills,
} from '../../components/skills'

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
					renderAdditionalItems={() => {
						if (selectedSkills.length) {
							return (
								<Button
									size="sm"
									variant="link"
									onClick={() => setSelectedSkills([])}
								>
									{t('clear-filter')}
								</Button>
							)
						}
						return null
					}}
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
