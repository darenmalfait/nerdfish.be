import { H2, RadioGroup } from '@daren/ui-components'

import * as React from 'react'

import { Button } from '~/components/buttons'

import { BasicForm } from '~/components/forms'
import { Container } from '~/components/layout'
import { useTranslations } from '~/context/translations-provider'

type FormType = 'basic' | 'project' | 'coffee'

interface FormChoiseProps {
  onSubmit: (type: FormType) => void
}

function FormSelector({ onSubmit }: FormChoiseProps) {
  const { t } = useTranslations()
  const [selected, setSelected] = React.useState<FormType>('project')

  const onChange = React.useCallback(val => {
    setSelected(val)
  }, [])

  function onClick() {
    onSubmit(selected)
  }

  return (
    <div className="space-y-8 max-w-2xl not-prose">
      <H2>{t('contact-title')}</H2>
      <RadioGroup name="form-selector" value={selected} onChange={onChange}>
        <RadioGroup.Option
          value="project"
          label={t('contact-option-project')}
        />
        <RadioGroup.Option value="basic" label={t('contact-option-basic')} />
        <RadioGroup.Option value="coffee" label={t('contact-option-coffee')} />
      </RadioGroup>
      <Button type="button" name="set-form-type" onClick={onClick}>
        Volgende
      </Button>
    </div>
  )
}

function PortableContactForm() {
  const { t } = useTranslations()
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
              {t('contact-option-coffee-title')}{' '}
              <span role="img" aria-label={t('coffee')}>
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
