import {Section} from '@nerdfish/ui'

function Placeholder({componentName}: {componentName: string | number}) {
  return (
    <Section className="border border-red-200 bg-red-100 py-4 text-center">
      <p className="mx-auto text-center text-red-700">
        The component <strong>{componentName}</strong> has not been created yet.
      </p>
    </Section>
  )
}

export {Placeholder}
