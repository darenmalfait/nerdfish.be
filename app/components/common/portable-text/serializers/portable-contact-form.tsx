import { H2, RadioGroup } from '@daren/ui-components'

import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '~/components/buttons'

import { BasicForm } from '~/components/forms'
import { Container } from '~/components/layout'

type FormType = 'basic' | 'project' | 'coffee'

interface FormChoiseProps {
  onSubmit: (type: FormType) => void
}

function FormSelector({ onSubmit }: FormChoiseProps) {
  const { t } = useTranslation()
  const [selected, setSelected] = React.useState<FormType>('project')

  const onChange = React.useCallback(val => {
    setSelected(val)
  }, [])

  function onClick() {
    onSubmit(selected)
  }

  return (
    <div className="space-y-8 max-w-2xl not-prose">
      <H2>{t('basic-form:title')}</H2>
      <RadioGroup name="form-selector" value={selected} onChange={onChange}>
        <RadioGroup.Option
          value="project"
          label={t('basic-form:options.project.label')}
        />
        <RadioGroup.Option
          value="basic"
          label={t('basic-form:options.basic-label')}
        />
        <RadioGroup.Option
          value="coffee"
          label={t('basic-form:options.coffee.label')}
        />
      </RadioGroup>
      <Button type="button" name="set-form-type" onClick={onClick}>
        Volgende
      </Button>
    </div>
  )
}

function PortableContactForm() {
  const { t } = useTranslation()
  const [selectedForm, setSelectedForm] = React.useState<FormType | null>(null)

  const onFormChoice = React.useCallback(choice => {
    setSelectedForm(choice)
  }, [])

  return (
    <Container size="default">
      {!selectedForm && <FormSelector onSubmit={onFormChoice} />}
      {selectedForm && (
        <div>
          {selectedForm === 'coffee' && (
            <H2>
              {t('basic-form:options.coffee.title')}{' '}
              <span role="img" aria-label={t('basic-form:coffee')}>
                ☕
              </span>
              ?
            </H2>
          )}
          <BasicForm withProject={selectedForm === 'project'} />
        </div>
      )}
    </Container>
  )
}

export { PortableContactForm }
