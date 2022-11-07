import clsx from 'clsx'

function Overlay({ open }: { open?: boolean }) {
  return (
    <div
      className={clsx(
        'fixed top-0 left-0 z-20 w-full h-full bg-primary-500 opacity-0 transition-opacity pointer-events-none md:hidden',
        { 'opacity-20': open },
      )}
    />
  )
}

export { Overlay }
