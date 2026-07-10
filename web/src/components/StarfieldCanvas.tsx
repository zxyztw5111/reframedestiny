import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  size: number
  opacity: number
  twinkle: number
  warm: boolean
  depth: number
  vx: number
  vy: number
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let stars: Star[] = []
    let frame = 0

    const initStars = () => {
      const count = Math.min(320, Math.floor(w * 0.22))
      stars = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.4 + 0.3,
        opacity: Math.random() * 0.55 + 0.25,
        twinkle: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.58,
        depth: Math.random(),
        vx: 0,
        vy: 0,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars()
    }

    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const draw = (now: number) => {
      const t = now * 0.001
      ctx.fillStyle = 'transparent'
      ctx.clearRect(0, 0, w, h)

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      for (const s of stars) {
        let px = s.x * w
        let py = s.y * h

        const dx = px - mouseRef.current.x
        const dy = py - mouseRef.current.y
        const dist = Math.hypot(dx, dy)
        const pull = dist < 240 ? (1 - dist / 240) * (2.8 + s.depth * 2.2) : 0
        s.vx += (dx / (dist || 1)) * pull * 0.09
        s.vy += (dy / (dist || 1)) * pull * 0.09
        s.vx *= 0.9
        s.vy *= 0.9
        px += s.vx
        py += s.vy

        const tw = s.opacity * (0.55 + 0.45 * Math.sin(t * (1.4 + s.depth) + s.twinkle))
        const r = s.size * (0.85 + s.depth * 0.4)

        const glow = ctx.createRadialGradient(px, py, 0, px, py, r * 4)
        glow.addColorStop(0, s.warm ? `rgba(255, 228, 180, ${tw})` : `rgba(180, 210, 255, ${tw})`)
        glow.addColorStop(0.45, s.warm ? `rgba(255, 190, 100, ${tw * 0.2})` : `rgba(130, 170, 255, ${tw * 0.18})`)
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(px, py, r * 4, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
      frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2] h-full w-full"
    />
  )
}
