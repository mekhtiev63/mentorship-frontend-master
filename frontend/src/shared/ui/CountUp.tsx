import CountUpImport from 'react-countup'
import type { CountUpProps } from 'react-countup'
import type { FC } from 'react'

type CountUpComponent = FC<CountUpProps>

/** CJS package: default import can be `{ default: CountUp }` under native ESM. */
export const CountUp: CountUpComponent =
  typeof CountUpImport === 'function'
    ? (CountUpImport as CountUpComponent)
    : (CountUpImport as { default: CountUpComponent }).default
