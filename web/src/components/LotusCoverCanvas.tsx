import { useEffect, useRef } from 'react'
import {
  applyLotusMotion,
  buildTitlePoints,
  lotusTarget,
  sandTarget,
  type LotusPoint,
} from '../lib/lotusGeometry'

/** Veldara-style cosmic void video — deep space, no earth */
export const COSMIC_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4'

type LotusParticle = {
  x: number
  y: number
  vx: number
  vy: number
  lotus: LotusPoint
  seed: number
  size: number
  opacity: number
}

type GoldParticle = {
  x: number
  y: number
  vx: number
  vy: number
  void: Point
  title: Point
  seed: number
  size: number
  opacity: number
}

type SandParticle = {
  x: number
  y: number
  vx: number
  vy: number
  sand: { x: number; y: number }
  seed: number
  size: number
  opacity: number
}

type Point = { x: number; y: number }

type LotusCoverCanvasProps = {
  onTitleReveal?: () => void
  onSequenceComplete?: () => void
}

const TAU = Math.PI * 2

const PHASE = {
  LOTUS_FADE_END: 2.8,
  TITLE_GATHER_END: 7.2,
  INTERACTIVE: 8.4,
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

function drawDustVeil(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  intensity: number,
) {
  const sweep = clamp(intensity)
  if (sweep <= 0.001) return

  ctx.save()
  ctx.globalAlpha = 0.22 * sweep
  ctx.translate(Math.sin(time * 0.14) * 32, Math.cos(time * 0.09) * 6)
  const gradient = ctx.createLinearGradient(width * -0.1, height * 0.42, width * 1.1, height * 0.62)
  gradient.addColorStop(0, 'rgba(216, 180, 106, 0)')
  gradient.addColorStop(0.42, 'rgba(216, 180, 106, 0.38)')
  gradient.addColorStop(0.6, 'rgba(156, 91, 70, 0.16)')
  gradient.addColorStop(1, 'rgba(216, 180, 106, 0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.ellipse(width * 0.5, height * 0.56, width * 0.7, height * 0.09, 0.08, 0, TAU)
  ctx.fill()
  ctx.restore()
}

function drawGoldenStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  alpha: number,
  twinkle: number,
  glow: number,
) {
  const g = glow * (0.55 + twinkle * 0.45)
  ctx.save()
  if (g > 0.06) {
    ctx.shadowBlur = r * (2.2 + g * 3.5)
    ctx.shadowColor = `rgba(255, 190, 70, ${alpha * g * 0.8})`
  }
  ctx.fillStyle = `rgba(255, ${210 + twinkle * 35}, ${90 + twinkle * 45}, ${alpha})`
  ctx.beginPath()
  ctx.arc(x, y, r, 0, TAU)
  ctx.fill()
  ctx.restore()
}

function drawSandGrain(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  alpha: number,
  twinkle: number,
) {
  ctx.save()
  ctx.shadowBlur = r * 3.2
  ctx.shadowColor = `rgba(216, 180, 106, ${alpha * 0.75})`
  ctx.fillStyle = `rgba(216, ${180 + twinkle * 28}, ${106 + twinkle * 20}, ${alpha})`
  ctx.beginPath()
  ctx.arc(x, y, r * 1.15, 0, TAU)
  ctx.fill()
  ctx.restore()
}

function drawLotusStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  alpha: number,
  twinkle: number,
) {
  ctx.save()
  ctx.shadowBlur = r * 2.2
  ctx.shadowColor = `rgba(238, 243, 240, ${alpha * 0.35})`
  ctx.fillStyle = `rgba(238, ${243 - twinkle * 8}, ${240 - twinkle * 12}, ${alpha})`
  ctx.beginPath()
  ctx.arc(x, y, r, 0, TAU)
  ctx.fill()
  ctx.restore()
}

function mouseForce(
  px: number,
  py: number,
  mx: number,
  my: number,
  down: boolean,
  radius: number,
  strength: number,
) {
  const dx = px - mx
  const dy = py - my
  const dist = Math.hypot(dx, dy)
  if (dist >= radius) return { fx: 0, fy: 0 }
  const f = (1 - dist / radius) * strength * (down ? 1.45 : 1)
  return { fx: (dx / (dist || 1)) * f, fy: (dy / (dist || 1)) * f }
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
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let lotusParticles: LotusParticle[] = []
    let goldParticles: GoldParticle[] = []
    let sandParticles: SandParticle[] = []
    let frame = 0
    const start = performance.now()
    const mouse = { x: -9999, y: -9999, down: false }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const lotusN = reduced ? 500 : Math.min(1300, Math.max(700, Math.floor((w * h) / 1600)))
      lotusParticles = Array.from({ length: lotusN }, (_, i) => {
        const lotus = lotusTarget(w, h, i)
        return {
          x: lotus.x + (Math.random() - 0.5) * w * 0.08,
          y: lotus.y + (Math.random() - 0.5) * h * 0.08,
          vx: 0,
          vy: 0,
          lotus,
          seed: Math.random() * 1000,
          size: Math.random() * 0.9 + 0.35,
          opacity: Math.random() * 0.35 + 0.45,
        }
      })

      const goldN = reduced ? 280 : Math.min(850, Math.max(380, Math.floor((w * h) / 3200)))
      const titles = buildTitlePoints(w, h, goldN)
      goldParticles = Array.from({ length: goldN }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        void: { x: Math.random() * w, y: Math.random() * h * 0.85 },
        title: titles[i],
        seed: Math.random() * 1000,
        size: Math.random() * 1.05 + 0.4,
        opacity: Math.random() * 0.4 + 0.3,
      }))

      const sandN = reduced ? 180 : Math.min(520, Math.max(260, Math.floor((w * h) / 5500)))
      sandParticles = Array.from({ length: sandN }, () => {
        const seed = Math.random() * 1000
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0,
          sand: sandTarget(w, h, seed),
          seed,
          size: Math.random() * 1.2 + 0.55,
          opacity: Math.random() * 0.35 + 0.4,
        }
      })
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onDown = () => {
      mouse.down = true
    }
    const onUp = () => {
      mouse.down = false
    }

    const tick = (now: number) => {
      const elapsed = reduced ? PHASE.INTERACTIVE + 1 : (now - start) / 1000
      const t = elapsed

      const lotusFade = smoothstep(0.4, PHASE.LOTUS_FADE_END, t)
      const titleGather = smoothstep(1.2, PHASE.TITLE_GATHER_END, t)
      const interactive = t >= PHASE.INTERACTIVE
      const sandFlow = smoothstep(PHASE.TITLE_GATHER_END - 1.5, PHASE.INTERACTIVE, t)
      const pointerActive = interactive || titleGather > 0.75
      const lotusRotation = t * 0.04

      if (titleGather > 0.88 && !titleDoneRef.current) {
        titleDoneRef.current = true
        onTitleRef.current?.()
      }
      if (interactive && !doneRef.current) {
        doneRef.current = true
        onCompleteRef.current?.()
      }

      ctx.clearRect(0, 0, w, h)

      if (sandFlow > 0.02) {
        drawDustVeil(ctx, w, h, t, sandFlow)
      }

      // --- Lotus layer ---
      if (lotusFade > 0.02) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        const aura = ctx.createRadialGradient(w / 2, h * 0.62, 0, w / 2, h * 0.62, Math.min(w, h) * 0.36)
        aura.addColorStop(0, `rgba(238, 243, 240, ${0.05 * lotusFade})`)
        aura.addColorStop(0.45, `rgba(216, 180, 106, ${0.025 * lotusFade})`)
        aura.addColorStop(1, 'rgba(216, 180, 106, 0)')
        ctx.fillStyle = aura
        ctx.fillRect(0, 0, w, h)

        for (const p of lotusParticles) {
          const base = applyLotusMotion(w, h, p.lotus, 1, lotusRotation)
          const breath = Math.sin(t * 0.85 + p.seed) * 1.8
          const tx = base.x + Math.cos(p.seed) * breath
          const ty = base.y + Math.sin(p.seed) * breath * 0.85
          p.vx += (tx - p.x) * (0.012 + lotusFade * 0.01)
          p.vy += (ty - p.y) * (0.012 + lotusFade * 0.01)
          p.vx *= 0.84
          p.vy *= 0.84
          p.x += p.vx
          p.y += p.vy

          const tw = 0.5 + 0.5 * Math.sin(t * 2.4 + p.seed)
          drawLotusStar(ctx, p.x, p.y, p.size * 1.05, p.opacity * lotusFade * (0.65 + tw * 0.35), tw)
        }
        ctx.restore()
      }

      // --- Flowing sand layer (mouse-interactive) ---
      if (sandFlow > 0.03) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        for (const p of sandParticles) {
          const sweep = (t * 58 + p.seed * 17) % (w * 1.35)
          const tx = p.sand.x * 0.72 + sweep - w * 0.18
          const ty = p.sand.y + Math.sin(t * 0.65 + p.seed) * h * 0.022
          const oceanX = Math.sin(t * 0.19 + p.seed) * 3.2 * sandFlow
          const oceanY = Math.cos(t * 0.16 + p.seed * 1.7) * 2.1 * sandFlow

          const { fx, fy } = pointerActive
            ? mouseForce(p.x, p.y, mouse.x, mouse.y, mouse.down, 200, mouse.down ? 7.5 : 3.2)
            : { fx: 0, fy: 0 }

          p.vx += (tx + oceanX - p.x) * (0.014 + sandFlow * 0.008) + fx
          p.vy += (ty + oceanY - p.y) * (0.014 + sandFlow * 0.008) + fy + 0.004 * sandFlow
          p.vx *= 0.84
          p.vy *= 0.84
          p.x += p.vx
          p.y += p.vy

          const tw = 0.5 + 0.5 * Math.sin(t * 2.8 + p.seed)
          const alpha = p.opacity * sandFlow * (0.55 + tw * 0.45)
          drawSandGrain(ctx, p.x, p.y, p.size, alpha, tw)
        }
        ctx.restore()
      }

      // --- Title gather stars ---
      if (titleGather > 0.08 && titleGather < 0.92) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        const titleGlow = ctx.createRadialGradient(w / 2, h * 0.34, 0, w / 2, h * 0.34, w * 0.32)
        titleGlow.addColorStop(0, `rgba(255, 215, 100, ${0.1 * titleGather})`)
        titleGlow.addColorStop(1, 'rgba(255, 215, 100, 0)')
        ctx.fillStyle = titleGlow
        ctx.fillRect(0, 0, w, h)
        ctx.restore()
      }

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      for (const p of goldParticles) {
        // Keep the lotus clean while it blooms — gold only appears once it
        // starts gathering into the title.
        if (titleGather < 0.1 && !interactive) continue

        let tx = p.void.x
        let ty = p.void.y
        let attract = 0.003
        let damp = 0.9

        if (titleGather < 0.98) {
          if (titleGather < 0.08) {
            tx = p.x + p.vx * 3
            ty = p.y + p.vy * 3
            attract = 0.001
            damp = 0.93
          } else {
            tx = lerp(p.void.x, p.title.x, titleGather)
            ty = lerp(p.void.y, p.title.y, titleGather)
            attract = 0.018 + titleGather * 0.014
            damp = 0.82
          }
        } else if (interactive) {
          const sweep = (t * 42 + p.seed * 11) % (w * 1.2)
          tx = p.void.x * 0.5 + sweep * 0.5 - w * 0.1
          ty = p.void.y + Math.sin(t * 0.5 + p.seed) * h * 0.015
          attract = 0.008
          damp = 0.88
        }

        const driftX = Math.sin(t * 0.16 + p.seed) * (interactive ? 2.8 : 0.6)
        const driftY = Math.cos(t * 0.14 + p.seed) * (interactive ? 2 : 0.45)

        const { fx, fy } = pointerActive
          ? mouseForce(p.x, p.y, mouse.x, mouse.y, mouse.down, 190, mouse.down ? 6.5 : 2.8)
          : { fx: 0, fy: 0 }

        p.vx += (tx + driftX - p.x) * attract + fx
        p.vy += (ty + driftY - p.y) * attract + fy
        p.vx *= damp
        p.vy *= damp
        p.x += p.vx
        p.y += p.vy

        const tw = 0.5 + 0.5 * Math.sin(t * 3.4 + p.seed * 2.2)
        let alpha = p.opacity * (0.5 + tw * 0.5)
        const forming = titleGather > 0.12 && titleGather < 0.92
        const glow = forming ? titleGather * 0.95 : interactive || sandFlow > 0.5 ? 0.42 : 0.12

        if (titleGather > 0.9) alpha *= lerp(1, 0.32, (titleGather - 0.9) / 0.1)
        if (interactive) alpha *= 0.78

        drawGoldenStar(ctx, p.x, p.y, p.size, alpha, tw, glow)
      }

      ctx.restore()
      frame = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <>
      <video
        className="pointer-events-none fixed inset-0 z-0 h-full w-full scale-105 object-cover"
        src={COSMIC_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_120%_80%_at_50%_20%,rgba(14,23,48,0.55),rgba(1,1,1,0.88)_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_80%_15%,rgba(74,122,155,0.12),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-[#010101]/25 via-transparent to-[#010101]/75"
        aria-hidden
      />
      <canvas ref={canvasRef} aria-hidden className="fixed inset-0 z-[2] h-full w-full touch-none" />
    </>
  )
}
