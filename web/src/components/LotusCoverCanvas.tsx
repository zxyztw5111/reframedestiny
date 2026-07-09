import { useEffect, useRef } from 'react'

/** Prompt-generated lotus / cosmic bloom — this video IS the lotus. */
export const LOTUS_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4'

type LotusCoverCanvasProps = {
  onTitleReveal?: () => void
  onSequenceComplete?: () => void
}

/** Cover: lotus video only → title appears. No gold gather (that runs after Enter). */
const TITLE_AT = 4.8
const READY_AT = 5.6

export function LotusCoverCanvas({ onTitleReveal, onSequenceComplete }: LotusCoverCanvasProps) {
  const titleDoneRef = useRef(false)
  const doneRef = useRef(false)
  const onTitleRef = useRef(onTitleReveal)
  const onCompleteRef = useRef(onSequenceComplete)
  onTitleRef.current = onTitleReveal
  onCompleteRef.current = onSequenceComplete

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      titleDoneRef.current = true
      doneRef.current = true
      onTitleRef.current?.()
      onCompleteRef.current?.()
      return
    }

    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = (now - start) / 1000
      if (t >= TITLE_AT && !titleDoneRef.current) {
        titleDoneRef.current = true
        onTitleRef.current?.()
      }
      if (t >= READY_AT && !doneRef.current) {
        doneRef.current = true
        onCompleteRef.current?.()
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <video
        className="pointer-events-none fixed inset-0 z-0 h-full w-full scale-105 object-cover"
        src={LOTUS_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-black/20" aria-hidden />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_100%_80%_at_50%_55%,transparent_35%,rgba(1,1,2,0.5)_100%)]"
        aria-hidden
      />
    </>
  )
}
