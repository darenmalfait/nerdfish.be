import { Button, Container, H2, RadioGroup } from '@daren/ui-components'

import * as React from 'react'

import { BasicForm } from '../../../components/forms/basic-form'

type FormType = 'basic' | 'project' | 'coffee'

function FormSelector({
  onSubmit,
  heading,
}: {
  onSubmit: (type: FormType) => void
  heading?: string
}) {
  const [selected, setSelected] = React.useState<FormType>('project')

  const onChange = React.useCallback((val: any) => {
    setSelected(val)
  }, [])

  function onClick() {
    onSubmit(selected)
  }

  return (
    <div className="not-prose space-y-8 max-w-2xl">
      {heading && <H2>{heading}</H2>}
      <RadioGroup name="form-selector" value={selected} onChange={onChange}>
        <RadioGroup.Option value="project" label="talk about a project" />
        <RadioGroup.Option value="basic" label="talk about the weather" />
        <RadioGroup.Option value="coffee" label="grab a coffee" />
      </RadioGroup>
      <Button type="button" name="set-form-type" onClick={onClick}>
        Volgende
      </Button>
    </div>
  )
}

function PortableContactForm({ heading }: { heading?: string }) {
  const [selectedForm, setSelectedForm] = React.useState<FormType | null>(null)

  const onFormChoice = React.useCallback((choice: FormType) => {
    setSelectedForm(choice)
  }, [])

  return (
    <Container size="default">
      {!selectedForm && (
        <FormSelector heading={heading} onSubmit={onFormChoice} />
      )}
      {selectedForm && (
        <div>
          {selectedForm === 'coffee' && (
            <H2>
              grab a coffee{' '}
              <span role="img" aria-label="Coffee">
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
