'use client'

import * as React from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import {Alert, Button, FormHelperText, Input, Label} from '@nerdfish/ui'
import {Loader2} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {env} from '~/env.mjs'
import {useFetcher} from '~/lib/utils/form-actions'
import {useRecaptcha} from '~/lib/utils/recaptcha'
import {contactFormSchema} from '~/lib/validations/contact'

import {RadioGroup} from './radio-group'

type FormData = z.infer<typeof contactFormSchema>

function BasicForm({withProject}: {withProject?: boolean}) {
  const {execute} = useRecaptcha()
  const {submit, error, status} = useFetcher()

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      textMessage: '',
      project: 'website',
    },
  })

  async function onSubmit(data: FormData) {
    let recaptchaResponse

    if (env.NEXT_PUBLIC_RECAPTCHA_SITEKEY) {
      recaptchaResponse = await execute()
    }

    await submit(`/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        recaptchaResponse,
      }),
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <div className="mb-8 space-y-8">
          <Input
            label="Name"
            id="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email"
            id="email"
            error={errors.email?.message}
            {...register('email')}
          />
          {withProject ? (
            <div className="not-prose space-y-3">
              <Label>Project</Label>
              <RadioGroup
                {...register('project')}
                defaultValue={getValues('project')}
                onChange={value => setValue('project', value)}
                label="Project"
                aria-label="Project"
              >
                <RadioGroup.Option value="website" label="Website" />
                <RadioGroup.Option value="application" label="Application" />
                <RadioGroup.Option value="event" label="Event" />
                <RadioGroup.Option value="other" label="Other" />
              </RadioGroup>
            </div>
          ) : null}
          <Input
            type="textarea"
            label="Message"
            id="message"
            error={errors.textMessage?.message}
            {...register('textMessage')}
          />
          <FormHelperText>
            We only use your data to get in touch with you.
          </FormHelperText>
          {status === 'done' ? (
            <Alert
              variant="success"
              title="Message sent"
              description="Your message has been sent successfully. 🎉"
            />
          ) : (
            <Button disabled={status !== 'idle'} type="submit">
              {status === 'loading' ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : null}
              Send message
            </Button>
          )}
        </div>
        {errors.recaptchaResponse?.message ? (
          <Alert
            variant="danger"
            title="reCAPTCHA error"
            description="Please verify that you are not a robot."
          />
        ) : null}
        {error ? (
          <Alert
            variant="danger"
            title="Error"
            description="There was an error submitting your form. Please try again."
          />
        ) : null}
      </fieldset>
    </form>
  )
}

export {BasicForm}
