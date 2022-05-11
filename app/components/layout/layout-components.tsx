import clsx from 'clsx'

interface SectionProps {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
}

function Section({ as: Tag = 'section', className, ...props }: SectionProps) {
  return (
    <Tag
      className={clsx('box-border items-center w-full', className)}
      {...props}
    />
  )
}

export type SizeValue = 'small' | 'default' | 'medium' | 'full'

interface ContainerProps {
  children: React.ReactNode
  size?: SizeValue
  as?: React.ElementType
  className?: string
}

function Container({
  size = 'default',
  children,
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={clsx(
        'col-span-full',
        {
          'lg:col-span-6 lg:col-start-4': size === 'small',
          'lg:col-span-8 lg:col-start-3': size === 'default',
          'lg:col-span-10 lg:col-start-2': size === 'medium',
          'lg:col-span-12 lg:col-start-0': size === 'full',
        },
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export { Container, Section }
