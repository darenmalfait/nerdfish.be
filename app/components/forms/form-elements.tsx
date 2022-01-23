import clsx from 'clsx'
import * as React from 'react'

function Label({
  className,
  htmlFor,
  ...props
}: JSX.IntrinsicElements['label']) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx('inline-block text-lg text-primary', className)}
      {...props}
    />
  )
}

type InputProps = { hasError?: boolean } & (
  | ({ type: 'textarea' } & JSX.IntrinsicElements['textarea'])
  | JSX.IntrinsicElements['input']
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref,
) {
  const { type, hasError, ...inputProps } = props

  const className = clsx(
    'py-5 px-8 w-full text-lg font-bold placeholder:text-gray-500 disabled:text-gray-400 rounded-lg border-none focus-ring',
    {
      'text-black bg-primary-700': !hasError,
      '!text-danger bg-primary-700 animate-shake !set-colors-accent-danger':
        hasError,
    },
    props.className,
  )

  if (type === 'textarea') {
    return (
      <textarea
        {...(inputProps as JSX.IntrinsicElements['textarea'])}
        className={clsx('h-36', className)}
      />
    )
  }

  return (
    <input
      type={type}
      {...(inputProps as JSX.IntrinsicElements['input'])}
      className={className}
      ref={ref}
    />
  )
})

interface InputErrorProps {
  id: string
  children?: string | null
}

function InputError({ children, id }: InputErrorProps) {
  if (!children) {
    return null
  }

  return (
    <p className=" mb-0 text-sm !text-danger" role="alert" id={id}>
      {children}
    </p>
  )
}

type FieldProps = {
  defaultValue?: string | null
  name: string
  label: string
  className?: string
  error?: string | null
  description?: React.ReactNode
}

const Field = React.forwardRef<HTMLInputElement, FieldProps & InputProps>(
  function Field(
    { defaultValue, error, name, label, className, description, id, ...props },
    ref,
  ) {
    const inputId = id ?? name
    const errorId = `${inputId}-error`
    const descriptionId = `${inputId}-description`

    return (
      <div className="mb-8">
        <div className="flex flex-col justify-between items-baseline mb-4 md:flex-row">
          <Label htmlFor={inputId}>{label}</Label>
          {error ? (
            <InputError id={errorId}>{error}</InputError>
          ) : description ? (
            <div className="text-lg text-primary" id={descriptionId}>
              {description}
            </div>
          ) : null}
        </div>

        <Input
          hasError={!!error}
          {...(props as InputProps)}
          ref={ref}
          name={name}
          id={inputId}
          autoComplete={name}
          required
          defaultValue={defaultValue}
          aria-describedby={
            error ? errorId : description ? descriptionId : undefined
          }
        />
      </div>
    )
  },
)

function ButtonGroup({ className, ...props }: JSX.IntrinsicElements['div']) {
  return (
    <div
      className={clsx(
        'flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4',
        className,
      )}
      {...props}
    />
  )
}

function FormHelperText({ className, ...props }: JSX.IntrinsicElements['div']) {
  return (
    <div className={clsx('text-sm text-primary-400', className)} {...props} />
  )
}

export { Label, Input, InputError, Field, ButtonGroup, FormHelperText }
