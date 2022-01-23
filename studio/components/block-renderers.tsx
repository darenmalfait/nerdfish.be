import clsx from 'clsx'
import * as React from 'react'
import tw, { styled, css } from 'twin.macro'

const StyledButton = styled.span(() => [
  tw`
  inline-block
  relative
  padding[.5rem 1.25rem]
  bg-black
  border[1px solid]
  text-white
  border-black
  rounded-lg
  `,
  css`
    &.inverted {
      ${tw`text-black bg-white border-black `}
    }
  `,
])

interface ButtonProps {
  isButton?: boolean
  styles?: Record<string, string>
  children?: any
}

export function Button({ isButton, styles, children }: ButtonProps) {
  if (!isButton) return children

  return (
    <StyledButton
      className={clsx('btn', styles?.style, {
        'is-block': styles?.isBlock,
      })}
    >
      {children}
    </StyledButton>
  )
}
