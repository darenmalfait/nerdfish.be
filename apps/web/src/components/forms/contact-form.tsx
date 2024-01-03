'use client'

import * as React from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import {contactFormData} from '@nerdfish-website/lib/validations'
import {RadioGroup} from '@nerdfish-website/ui/components/radio-group'
import {Alert, Button, FormHelperText, Input, Label} from '@nerdfish/ui'
import {Loader2} from 'lucide-react'
import {useForm} from 'react-hook-form'

import {env} from '~/env.mjs'
import {useRecaptcha} from '~/lib/utils/recaptcha'
import {contactFormSchema} from '~/lib/validations/contact'

import {submitContactForm} from './contact-form.action'

function ContactForm({withProject}: {withProject?: boolean}) {
  const {execute} = useRecaptcha()
  const [error, setError] = React.useState<string>()

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: {errors, isSubmitting, isSubmitSuccessful},
  } = useForm<contactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      textMessage: '',
      project: 'website',
    },
  })

  async function onSubmit(data: contactFormData) {
    try {
      setError(undefined)
      let recaptchaResponse

      if (env.NEXT_PUBLIC_RECAPTCHA_SITEKEY) {
        try {
          recaptchaResponse = await execute()
        } catch {
          throw new Error('reCAPTCHA error')
        }
      }

      const result = await submitContactForm({
        ...data,
        recaptchaResponse,
      })

      if (!result.success) {
        throw new Error('An error occurred while submitting the form.')
      }

      reset()
    } catch (e) {
      setError(e.message)
    }
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
          {isSubmitSuccessful && !error ? (
            <Alert
              variant="success"
              title="Message sent"
              description="Your message has been sent successfully. 🎉"
            />
          ) : (
            <Button
              disabled={isSubmitting || (isSubmitSuccessful && !error)}
              type="submit"
            >
              {isSubmitting ? <Loader2 className="mr-2 animate-spin" /> : null}
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
          <Alert variant="danger" title="Error" description={error} />
        ) : null}
      </fieldset>
    </form>
  )
}

export {ContactForm}
