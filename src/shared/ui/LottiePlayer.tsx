import Lottie from 'lottie-react'
import type { CSSProperties } from 'react'

type LottiePlayerProps = {
  animationData: object
  loop?: boolean
  style?: CSSProperties
}

export function LottiePlayer({ animationData, loop = true, style }: LottiePlayerProps) {
  return <Lottie animationData={animationData} loop={loop} style={{ width: 120, height: 120, ...style }} />
}
