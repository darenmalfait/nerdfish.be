import { Section } from '@daren/ui-components'

function Placeholder({ componentName }: { componentName: string | number }) {
  return (
    <Section className="py-4 text-center bg-red-100 border border-red-200">
      <p className="mx-auto text-center text-red-700">
        The component <strong>{componentName}</strong> has not been created yet.
      </p>
    </Section>
  )
}

export { Placeholder }
