import clsx from 'clsx'

function Overlay({open}: {open?: boolean}) {
  return (
    <div
      className={clsx(
        'pointer-events-none fixed top-0 left-0 z-20 h-full w-full bg-primary-500 opacity-0 transition-opacity md:hidden',
        {'opacity-20': open},
      )}
    />
  )
}

export {Overlay}
