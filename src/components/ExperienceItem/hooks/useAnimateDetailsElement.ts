import { MouseEventHandler, useRef, useState } from "react"

enum AnimationState {
  IDLE = "IDLE",
  EXPANDING = "EXPANDING",
  SHRINKING = "SHRINKING",
}

const DEFAULT_ANIMATION_OPTIONS: KeyframeAnimationOptions = {
  duration: 300,
  easing: "ease-in-out",
}

type HandleAnimateHeightProps = {
  animationState: AnimationState
  startHeight: number
  endHeight: number
  isOpen: boolean
}

// Heavily inspired by https://codepen.io/AliKlein/pen/VwBENaV
// Thanks @AliKlein!

export const useAnimateDetailsElement = () => {
  const [animation, setAnimation] = useState<Animation | undefined | null>(null)
  const [animationState, setAnimationState] = useState<AnimationState>(
    AnimationState.IDLE,
  )

  const contentRef = useRef<HTMLElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const summaryRef = useRef<HTMLElement>(null)

  const onAnimationFinish = () => {
    if (!detailsRef.current) return
    detailsRef.current.style.height = ""
    detailsRef.current.style.overflow = ""

    setAnimation(null)
    setAnimationState(AnimationState.IDLE)
  }

  const handleAnimateHeight = ({
    animationState,
    startHeight,
    endHeight,
    isOpen,
  }: HandleAnimateHeightProps) => {
    if (!detailsRef.current) return
    setAnimationState(animationState)

    // Setting open parameter as soon as the animation starts
    // Caused problems with arrow styles and it's rotation
    detailsRef.current.open = isOpen

    if (animation) {
      animation.cancel()
    }

    const detailsAnimation = detailsRef.current.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      DEFAULT_ANIMATION_OPTIONS,
    )

    setAnimation(detailsAnimation)
    detailsAnimation.onfinish = () => onAnimationFinish()
    detailsAnimation.oncancel = () => setAnimationState(AnimationState.IDLE)
  }

  const handleAnimateShrink = () => {
    if (!detailsRef.current || !summaryRef.current) return
    setAnimationState(AnimationState.SHRINKING)

    const startHeight = detailsRef.current.offsetHeight
    const endHeight = summaryRef.current.offsetHeight

    handleAnimateHeight({
      animationState: AnimationState.SHRINKING,
      startHeight,
      endHeight,
      isOpen: false,
    })
  }

  const handleAnimateExpand = () => {
    if (!detailsRef.current || !summaryRef.current || !contentRef.current)
      return
    const startHeight = detailsRef.current.offsetHeight

    const summaryOffsetHeight = summaryRef.current.offsetHeight
    const contentOffsetHeight = contentRef.current.offsetHeight

    const endHeight = summaryOffsetHeight + contentOffsetHeight

    handleAnimateHeight({
      animationState: AnimationState.EXPANDING,
      startHeight,
      endHeight,
      isOpen: true,
    })
  }

  const handleOpen = () => {
    if (!detailsRef.current) return

    const detailsHeight = detailsRef.current.offsetHeight
    detailsRef.current.style.height = `${detailsHeight}px`
    detailsRef.current.open = true

    requestAnimationFrame(handleAnimateExpand)
  }

  const handleClick: MouseEventHandler<HTMLElement> = e => {
    e.preventDefault()

    if (!detailsRef.current) return

    detailsRef.current.style.overflow = "hidden"

    const isShrinking = animationState === AnimationState.SHRINKING
    const isOpen = detailsRef.current.open
    const isExpanding = animationState === AnimationState.EXPANDING

    if (isShrinking || !isOpen) {
      handleOpen()
    } else if (isExpanding || isOpen) {
      handleAnimateShrink()
    }
  }

  return {
    detailsRef,
    summaryRef,
    contentRef,
    handleClick,
  }
}
