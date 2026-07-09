import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sampleTitleLetters } from '../lib/lotusGeometry'

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

type GoldGatherIntroProps = {
  onComplete: () => void
}

const TAU = Math.PI * 2

const PHASE = {
  GOLD_APPEAR: 0.35,
  TITLE_GATHER_END: 3.2,
  SCATTER_END: 4.8,
  DONE: 5.2,
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

export function GoldGatherIntro({ onComplete }: GoldGatherIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const titleDoneRef = useRef(false)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

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

    const finish = () => {
      if (!doneRef.current) {
        doneRef.current = true
        onCompleteRef.current()
      }
    }

    if (reduced) {
      setTitleVisible(true)
      setTimeout(finish, 800)
      return
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(320, Math.max(200, Math.floor((w * h) / 5500)))
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
      const t = (now - start) / 1000

      const goldVisible = smoothstep(PHASE.GOLD_APPEAR, PHASE.GOLD_APPEAR + 0.25, t)
      const titleGather = goldVisible > 0 ? smoothstep(PHASE.GOLD_APPEAR, PHASE.TITLE_GATHER_END, t) : 0
      const scatter = smoothstep(PHASE.TITLE_GATHER_END, PHASE.SCATTER_END, t)

      if (t >= PHASE.TITLE_GATHER_END && !titleDoneRef.current) {
        titleDoneRef.current = true
        setTitleVisible(true)
      }
      if (t >= PHASE.DONE) finish()

      ctx.clearRect(0, 0, w, h)

      const bg = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, w * 0.75)
      bg.addColorStop(0, '#141028')
      bg.addColorStop(0.5, '#0a0e1a')
      bg.addColorStop(1, '#030508')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

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
    <section className="fixed inset-0 z-50 overflow-hidden bg-[#030508]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <AnimatePresence>
        {titleVisible && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif-en text-[clamp(2rem,6.5vw,4.5rem)] font-light tracking-[0.22em] text-[#f5e6c8] drop-shadow-[0_0_40px_rgba(216,180,106,0.35)]">
              REFRAME DESTINY
            </h1>
            <p className="mt-4 font-serif-cn text-[clamp(1rem,2.8vw,1.6rem)] font-light tracking-[0.38em] text-[#e8e4d8]/92">
              重塑命运
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => onCompleteRef.current()}
        className="liquid-glass absolute right-5 top-5 z-20 px-4 py-2 font-serif-cn text-xs tracking-[0.16em] text-[#e8e4d8]/80 transition hover:text-white"
      >
        Skip · 跳过
      </button>
    </section>
  )
}
