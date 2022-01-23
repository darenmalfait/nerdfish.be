import clsx from 'clsx'
import * as React from 'react'

export enum AlertType {
  Info,
  Danger,
  Success,
}

interface AlertProps {
  type?: AlertType
  children?: React.ReactNode
}

function Alert({ type = AlertType.Info, children }: AlertProps) {
  return (
    <div className="relative py-8 px-11 mt-8" role="alert">
      <div
        className={clsx('absolute inset-0 rounded-lg opacity-25', {
          'bg-danger-100': type === AlertType.Danger,
          'bg-success-100': type === AlertType.Success,
          'bg-primary-800': type === AlertType.Info,
        })}
      />
      <div
        className={clsx('relative text-lg font-bold text-primary-900', {
          'text-danger! set-colors-accent-danger': type === AlertType.Danger,
          'text-success! set-colors-accent-success': type === AlertType.Success,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export { Alert }
