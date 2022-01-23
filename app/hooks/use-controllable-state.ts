import { Dispatch, SetStateAction, useState } from 'react'

export function useControllableState<T>(
  propValue: T | undefined,
  initialValue: T | (() => T),
  changeHandler?: Dispatch<SetStateAction<T | undefined>>,
): [T, (value: T) => void] {
  const [stateValue, setState] = useState<T>(initialValue)
  const value = propValue !== undefined ? propValue : stateValue

  return [
    value,
    (newValue: T) => {
      setState(newValue)
      if (changeHandler) {
        changeHandler(newValue)
      }
    },
  ]
}
