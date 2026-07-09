import { useEffect, useRef } from 'react'
import { sampleTitleLetters } from '../lib/lotusGeometry'

/** Prompt-generated lotus / cosmic bloom — this video IS the lotus. */
export const LOTUS_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4'

type Point = { x: number; y: number }

type GoldParticle = {
  x: number
  y: number
  vx: number
  vy: number
  spawn: Point
  title: Point
  scatter: Point
  seed: number
  size: number
  opacity: number
}

type LotusCoverCanvasProps = {
  onTitleReveal?: () => void
  onSequenceComplete?: () => void
}

const TAU = Math.PI * 2

/** Gather → swap to DOM title → all gold scatters (v1 timing). */
const PHASE = {
  GOLD_APPEAR: 4.2,
  TITLE_GATHER_END: 7.4,
  SCATTER_END: 9.0,
  DONE: 9.4,
} as const

function clamp(v: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, v))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function smoothstep(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0))
  return t * t * (3 - 2 * t)
}

function edgeSpawn(w: number, h: number, seed: number): Point {
  const side = Math.floor((seed * 3.7) % 4)
  const t = (seed * 11.3) % 1
  if (side === 0) return { x: -24 - (seed % 1) * 40, y: t * h * 0.55 }
  if (side === 1) return { x: w + 24 + (seed % 1) * 40, y: t * h * 0.55 }
  if (side === 2) return { x: t * w, y: -24 - (seed % 1) * 30 }
  return { x: t * w, y: h * 0.58 + (seed % 1) * 40 }
}

function scatterTarget(w: number, h: number, seed: number): Point {
  return {
    x: ((seed * 17.1) % 1) * w,
    y: ((seed * 9.3) % 1) * h * 0.5,
  }
}

export function LotusCoverCanvas({ onTitleReveal, onSequenceComplete }: LotusCoverCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleDoneRef = useRef(false)
  const doneRef = useRef(false)
  const onTitleRef = useRef(onTitleReveal)
  const onCompleteRef = useRef(onSequenceComplete)
  onTitleRef.current = onTitleReveal
  onCompleteRef.current = onSequenceComplete

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let w = 0
    let h = 0
    let goldParticles: GoldParticle[] = []
    let frame = 0
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = reduced ? 200 : Math.min(420, Math.max(260, Math.floor((w * h) / 4500)))
      const letters = sampleTitleLetters(w, h, count)

      goldParticles = letters.map((title, i) => {
        const seed = i * 1.37 + Math.random() * 100
        const spawn = edgeSpawn(w, h, seed)
        return {
          x: spawn.x,
          y: spawn.y,
          vx: 0,
          vy: 0,
          spawn,
          title,
          scatter: scatterTarget(w, h, seed + 19),
          seed,
          size: 0.7 + (seed % 1) * 0.5,
          opacity: 0.55 + (seed % 1) * 0.35,
        }
      })
    }

    const tick = (now: number) => {
      const t = reduced ? PHASE.DONE + 1 : (now - start) / 1000

      const goldVisible = smoothstep(PHASE.GOLD_APPEAR, PHASE.GOLD_APPEAR + 0.35, t)
      const titleGather = goldVisible > 0 ? smoothstep(PHASE.GOLD_APPEAR, PHASE.TITLE_GATHER_END, t) : 0
      const scatter = smoothstep(PHASE.TITLE_GATHER_END, PHASE.SCATTER_END, t)
      const done = t >= PHASE.DONE

      if (t >= PHASE.TITLE_GATHER_END && !titleDoneRef.current) {
        titleDoneRef.current = true
        onTitleRef.current?.()
      }
      if (done && !doneRef.current) {
        doneRef.current = true
        onCompleteRef.current?.()
      }

      ctx.clearRect(0, 0, w, h)

      if (goldVisible <= 0.02) {
        frame = requestAnimationFrame(tick)
        return
      }

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      const forming = scatter <= 0 && titleGather < 0.98
      if (forming && titleGather > 0.2) {
        ctx.shadowColor = 'rgba(255, 200, 80, 0.35)'
        ctx.shadowBlur = 5
      }

      for (const p of goldParticles) {
        let tx = p.spawn.x
        let ty = p.spawn.y
        let attract = 0.028
        let damp = 0.76

        if (scatter <= 0) {
          const ease = titleGather * titleGather * (3 - 2 * titleGather)
          tx = lerp(p.spawn.x, p.title.x, ease)
          ty = lerp(p.spawn.y, p.title.y, ease)
          attract = 0.032 + titleGather * 0.045
        } else if (scatter < 1) {
          tx = lerp(p.title.x, p.scatter.x, scatter)
          ty = lerp(p.title.y, p.scatter.y, scatter)
          attract = 0.038
          damp = 0.74
        } else {
          tx = p.scatter.x + Math.sin(t * 0.5 + p.seed) * 5
          ty = p.scatter.y + Math.cos(t * 0.45 + p.seed) * 3
          attract = 0.003
          damp = 0.94
        }

        p.vx += (tx - p.x) * attract
        p.vy += (ty - p.y) * attract
        p.vx *= damp
        p.vy *= damp
        p.x += p.vx
        p.y += p.vy

        const tw = 0.5 + 0.5 * Math.sin(t * 3.2 + p.seed)
        let alpha = p.opacity * goldVisible
        let radius = p.size

        if (scatter <= 0) {
          alpha *= 0.5 + titleGather * 0.45
          radius *= 0.85 + titleGather * 0.35
        } else {
          alpha *= lerp(0.85, 0.12, scatter)
          radius *= lerp(1.05, 0.65, scatter)
        }

        if (alpha < 0.02) continue

        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, TAU)
        ctx.fillStyle = `rgba(255, ${205 + tw * 40}, ${85 + tw * 50}, ${alpha})`
        ctx.fill()
      }

      ctx.shadowBlur = 0
      ctx.restore()

      frame = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
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
        preload="metadata"
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-black/25" aria-hidden />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_100%_80%_at_50%_55%,transparent_30%,rgba(1,1,2,0.55)_100%)]"
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] h-full w-full"
      />
    </>
  )
}
