'use client'

import { TagFilterTitle } from '@repo/design-system/components/tag-filter'
import * as React from 'react'
import {
	SkillItem,
	skills,
	Skills,
	SkillsFilter,
} from '~/app/components/skills'

export function Toolbox() {
	const [selectedSkills, setSelectedSkills] = React.useState<string[]>([])

	const handleSkillClick = (category: string) => {
		if (selectedSkills.includes(category)) {
			setSelectedSkills([])
		} else {
			setSelectedSkills([category])
		}
	}

	const filteredSkills =
		selectedSkills.length > 0
			? skills.filter((skill) =>
					selectedSkills.some((selected) => skill.category.includes(selected)),
				)
			: skills

	return (
		<div className="gap-xl flex flex-col">
			<div>
				<SkillsFilter
					selectedTags={selectedSkills}
					onToggleTag={handleSkillClick}
					enabledTags={skills.map((skill) => skill.category).flat()}
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
