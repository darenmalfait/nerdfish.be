'use client'

import * as React from 'react'
import {RadioGroup} from '@nerdfish-website/ui/components/radio-group'
import {Button, Container, H2} from '@nerdfish/ui'

import {ContactForm} from '../forms/contact-form'

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
    <div className="not-prose max-w-2xl space-y-8">
      {heading ? <H2>{heading}</H2> : null}
      <RadioGroup name="form-selector" value={selected} onChange={onChange}>
        <RadioGroup.Option value="project" label="talk about a project" />
        <RadioGroup.Option value="basic" label="talk about the weather" />
        <RadioGroup.Option value="coffee" label="grab a coffee" />
      </RadioGroup>
      <Button type="button" name="set-form-type" onClick={onClick}>
        Write your message
      </Button>
    </div>
  )
}

function PortableContactForm({heading}: {heading?: string}) {
  const [selectedForm, setSelectedForm] = React.useState<FormType | null>(null)

  const onFormChoice = React.useCallback((choice: FormType) => {
    setSelectedForm(choice)
  }, [])

  return (
    <Container size="default" className="not-prose">
      {selectedForm ? (
        <div>
          {selectedForm === 'coffee' ? (
            <H2>
              grab a coffee{' '}
              <span role="img" aria-label="Coffee">
                ☕
              </span>
              ?
            </H2>
          ) : null}
          <ContactForm withProject={selectedForm === 'project'} />
        </div>
      ) : (
        <FormSelector heading={heading} onSubmit={onFormChoice} />
      )}
    </Container>
  )
}

export {PortableContactForm}
