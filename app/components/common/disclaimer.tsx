import clsx from 'clsx'
import * as React from 'react'

interface DisclaimerProps {
  companyName: string
}

function Heart({ active }: { active?: boolean }) {
  return <div className={clsx('disclaimer', { active })} />
}

function Disclaimer({ companyName }: DisclaimerProps) {
  const [hovered, setHovered] = React.useState(false)

  const styles = {
    part: 'relative pr-3 md:inline-block text-primary',
  }

  function toggleHover() {
    setHovered(hoverState => !hoverState)
  }

  return (
    <div className="py-4 w-full text-sm text-left sm:py-0">
      <div className={styles.part}>
        <span role="img" aria-label="copyright">
          ©️
        </span>{' '}
        {companyName}
        <div className="hidden absolute -right-1 md:inline-block">|</div>
      </div>
      <div className={clsx(styles.part, 'pl-3')}>
        Created with{` `}
        <Heart active={hovered} />
        {` `}
        by{` `}
        <a
          className="font-bold"
          href="https://www.daren.be"
          rel="noreferrer noopener"
          target="_blank"
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          Daren
        </a>
      </div>
    </div>
  )
}

export { Disclaimer }
