import { useEffect, useRef } from 'react'

type Target = {
  x: number
  y: number
  z: number
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  star: Target
  lotus: Target
  traveler: Target
  sand: Target
  title: Target
  burst: Target
  role: 'lotus' | 'traveler' | 'halo'
  seed: number
  size: number
}

type CosmicParticleCanvasProps = {
  active: boolean
  opening?: boolean
  onOpeningComplete?: () => void
}

const TAU = Math.PI * 2
const OPENING_COMPLETE_AT = 9.4

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function rotate(x: number, y: number, angle: number) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return { x: x * c - y * s, y: x * s + y * c }
}

function shuffle<T>(items: T[]) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const value = items[index]
    items[index] = items[swapIndex]
    items[swapIndex] = value
  }
  return items
}

function buildTitleTargets(width: number, height: number, count: number): Target[] {
  const sampleWidth = Math.max(360, Math.min(1280, Math.floor(width * 0.9)))
  const sampleHeight = Math.max(190, Math.min(360, Math.floor(height * 0.35)))
  const titleCanvas = document.createElement('canvas')
  titleCanvas.width = sampleWidth
  titleCanvas.height = sampleHeight

  const titleCtx = titleCanvas.getContext('2d')
  if (!titleCtx) return fallbackTitleTargets(width, height, count)

  const fontSize = Math.min(sampleWidth / 6.2, sampleHeight / 2.25)
  titleCtx.clearRect(0, 0, sampleWidth, sampleHeight)
  titleCtx.fillStyle = '#ffffff'
  titleCtx.textAlign = 'center'
  titleCtx.textBaseline = 'middle'
  titleCtx.shadowColor = 'rgba(216, 180, 106, 0.7)'
  titleCtx.shadowBlur = fontSize * 0.08
  titleCtx.font = `300 ${fontSize}px "Cormorant Garamond", "EB Garamond", Georgia, serif`
  titleCtx.fillText('REFRAME', sampleWidth / 2, sampleHeight / 2 - fontSize * 0.48)
  titleCtx.fillText('DESTINY', sampleWidth / 2, sampleHeight / 2 + fontSize * 0.48)

  const pixels = titleCtx.getImageData(0, 0, sampleWidth, sampleHeight).data
  const stride = Math.max(3, Math.floor(sampleWidth / 330))
  const candidates: Target[] = []

  for (let y = 0; y < sampleHeight; y += stride) {
    for (let x = 0; x < sampleWidth; x += stride) {
      const alpha = pixels[(y * sampleWidth + x) * 4 + 3]
      if (alpha > 36) {
        candidates.push({
          x: width * 0.5 - sampleWidth / 2 + x + randomBetween(-1.2, 1.2),
          y: height * 0.49 - sampleHeight / 2 + y + randomBetween(-1.2, 1.2),
          z: randomBetween(0.62, 1),
        })
      }
    }
  }

  if (candidates.length === 0) return fallbackTitleTargets(width, height, count)

  shuffle(candidates)
  return Array.from({ length: count }, (_, index) => {
    const point = candidates[index % candidates.length]
    return {
      x: point.x + randomBetween(-1.8, 1.8),
      y: point.y + randomBetween(-1.8, 1.8),
      z: point.z,
    }
  })
}

function fallbackTitleTargets(width: number, height: number, count: number): Target[] {
  const columns = Math.ceil(Math.sqrt(count * 5.2))
  const rows = Math.ceil(count / columns)
  const titleWidth = Math.min(width * 0.78, 940)
  const titleHeight = Math.min(height * 0.22, 240)

  return Array.from({ length: count }, (_, index) => {
    const column = index % columns
    const row = Math.floor(index / columns) % rows
    return {
      x: width * 0.5 - titleWidth / 2 + (column / columns) * titleWidth,
      y: height * 0.49 - titleHeight / 2 + (row / rows) * titleHeight,
      z: randomBetween(0.62, 1),
    }
  })
}

function lotusTarget(width: number, height: number, index: number): Target {
  const cx = width * 0.5
  const cy = height * 0.55
  const scale = Math.min(width * 0.9, height * 1.02)

  if (index % 17 === 0) {
    const angle = randomBetween(0, TAU)
    const radius = Math.sqrt(Math.random()) * scale * 0.12
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius * 0.72,
      z: randomBetween(0.7, 1),
    }
  }

  const layer = index % 4
  const petalCounts = [8, 12, 16, 20]
  const petalCount = petalCounts[layer]
  const petal = Math.floor(index / 4) % petalCount
  const angle = (petal / petalCount) * TAU + (layer % 2) * (Math.PI / petalCount)
  const t = Math.pow(randomBetween(0.08, 1), 0.78)
  const side = randomBetween(-1, 1)
  const length = scale * (0.24 + layer * 0.055)
  const petalWidth = scale * (0.055 + layer * 0.017)
  const localX = side * petalWidth * Math.sin(t * Math.PI)
  const localY = -length * t + scale * 0.035 * Math.sin(t * Math.PI)
  const rotated = rotate(localX, localY, angle)
  const mandalaPush = scale * (0.025 + layer * 0.015)

  return {
    x: cx + rotated.x + Math.sin(angle) * mandalaPush,
    y: cy + rotated.y - Math.cos(angle) * mandalaPush * 0.42 + scale * 0.04,
    z: randomBetween(0.5, 1),
  }
}

function travelerTarget(width: number, height: number, index: number): Target {
  const cx = width * 0.37
  const ground = height * 0.79
  const bodyHeight = Math.min(width, height) * 0.31
  const bodyWidth = bodyHeight * 0.2
  const selector = index % 11
  let x = cx
  let y = ground - bodyHeight * 0.45

  if (selector < 2) {
    const a = randomBetween(0, TAU)
    const r = Math.sqrt(Math.random())
    x = cx + Math.cos(a) * r * bodyWidth * 0.62
    y = ground - bodyHeight * 0.93 + Math.sin(a) * r * bodyWidth * 0.76
  } else if (selector < 7) {
    const t = Math.random()
    const taper = 1 - Math.abs(t - 0.45) * 0.7
    x = cx + randomBetween(-bodyWidth, bodyWidth) * taper
    y = ground - bodyHeight * (0.82 - t * 0.58)
  } else if (selector < 9) {
    const t = Math.random()
    const side = selector === 7 ? -1 : 1
    x = cx + side * bodyWidth * randomBetween(0.1, 0.8) * t
    y = ground - bodyHeight * 0.26 + t * bodyHeight * 0.19
  } else {
    const t = Math.random()
    const side = selector === 9 ? -1 : 1
    x = cx + side * bodyWidth * randomBetween(0.7, 1.75)
    y = ground - bodyHeight * (0.68 - t * 0.24)
  }

  return { x, y, z: randomBetween(0.5, 1) }
}

function sandTarget(width: number, height: number): Target {
  const x = randomBetween(-width * 0.16, width * 1.16)
  const wave = Math.sin(x * 0.006 + randomBetween(0, TAU)) * height * 0.06
  return {
    x,
    y: height * randomBetween(0.43, 0.66) + wave,
    z: randomBetween(0.35, 1),
  }
}

function starTarget(width: number, height: number): Target {
  return {
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    z: randomBetween(0.15, 1),
  }
}

function burstTarget(width: number, height: number, lotus: Target): Target {
  const cx = width * 0.5
  const cy = height * 0.55
  const dx = lotus.x - cx
  const dy = lotus.y - cy
  const distance = Math.hypot(dx, dy) || 1
  const scale = Math.min(width, height)
  const blast = scale * randomBetween(0.18, 0.42)

  return {
    x: lotus.x + (dx / distance) * blast + randomBetween(-scale * 0.08, scale * 0.08),
    y: lotus.y + (dy / distance) * blast + randomBetween(-scale * 0.06, scale * 0.06),
    z: randomBetween(0.46, 1),
  }
}

function createParticles(width: number, height: number, reducedMotion: boolean, opening: boolean): Particle[] {
  const area = width * height
  const count = reducedMotion
    ? Math.min(580, Math.max(280, Math.floor(area / 3000)))
    : Math.min(2400, Math.max(1050, Math.floor(area / 940)))
  const titleTargets = buildTitleTargets(width, height, count)

  return Array.from({ length: count }, (_, index) => {
    const role = index % 5 === 0 ? 'traveler' : index % 7 === 0 ? 'halo' : 'lotus'
    const star = starTarget(width, height)
    const lotus = lotusTarget(width, height, index)
    const sand = sandTarget(width, height)
    const title = titleTargets[index]
    const start = opening && !reducedMotion ? sand : opening && reducedMotion ? title : star

    return {
      x: start.x + randomBetween(-8, 8),
      y: start.y + randomBetween(-5, 5),
      vx: 0,
      vy: 0,
      star,
      lotus,
      traveler: travelerTarget(width, height, index),
      sand,
      title,
      burst: burstTarget(width, height, lotus),
      role,
      seed: Math.random() * 1000,
      size: randomBetween(0.65, role === 'traveler' ? 1.8 : 1.5),
    }
  })
}

function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const cx = width * 0.52
  const cy = height * 0.35
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height))
  gradient.addColorStop(0, '#0e1730')
  gradient.addColorStop(0.42, '#080b15')
  gradient.addColorStop(1, '#05060a')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.save()
  ctx.globalAlpha = 0.15
  ctx.translate(Math.sin(time * 0.04) * 14, Math.cos(time * 0.035) * 8)
  const nebula = ctx.createRadialGradient(width * 0.22, height * 0.28, 0, width * 0.22, height * 0.28, width * 0.8)
  nebula.addColorStop(0, 'rgba(74, 122, 155, 0.38)')
  nebula.addColorStop(0.45, 'rgba(156, 91, 70, 0.12)')
  nebula.addColorStop(1, 'rgba(5, 6, 10, 0)')
  ctx.fillStyle = nebula
  ctx.fillRect(0, 0, width, height)
  ctx.restore()
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
  ctx.globalAlpha = 0.2 * sweep
  ctx.translate(Math.sin(time * 0.14) * 28, 0)
  const gradient = ctx.createLinearGradient(width * -0.1, height * 0.42, width * 1.1, height * 0.62)
  gradient.addColorStop(0, 'rgba(216, 180, 106, 0)')
  gradient.addColorStop(0.42, 'rgba(216, 180, 106, 0.34)')
  gradient.addColorStop(0.6, 'rgba(156, 91, 70, 0.14)')
  gradient.addColorStop(1, 'rgba(216, 180, 106, 0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.ellipse(width * 0.5, height * 0.55, width * 0.68, height * 0.085, 0.1, 0, TAU)
  ctx.fill()
  ctx.restore()
}

function drawLotusAura(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, intensity: number) {
  const glow = clamp(intensity)
  if (glow <= 0.001) return

  const cx = width * 0.5
  const cy = height * 0.55
  const scale = Math.min(width * 0.9, height * 1.02)

  ctx.save()
  ctx.globalCompositeOperation = 'screen'
  ctx.globalAlpha = 0.22 * glow
  const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.55)
  aura.addColorStop(0, 'rgba(238, 218, 162, 0.36)')
  aura.addColorStop(0.36, 'rgba(216, 180, 106, 0.18)')
  aura.addColorStop(1, 'rgba(216, 180, 106, 0)')
  ctx.fillStyle = aura
  ctx.fillRect(0, 0, width, height)

  ctx.globalAlpha = 0.055 * glow * (0.8 + Math.sin(time * 1.4) * 0.2)
  ctx.strokeStyle = 'rgba(238, 218, 162, 0.7)'
  ctx.lineWidth = 1
  for (let petal = 0; petal < 16; petal += 1) {
    const angle = (petal / 16) * TAU
    ctx.save()
    ctx.translate(cx, cy + scale * 0.04)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.ellipse(0, -scale * 0.22, scale * 0.075, scale * 0.3, 0, 0, TAU)
    ctx.stroke()
    ctx.restore()
  }
  ctx.restore()
}

function drawTitleBloom(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, intensity: number) {
  const bloom = clamp(intensity)
  if (bloom <= 0.001) return

  ctx.save()
  ctx.globalCompositeOperation = 'screen'
  ctx.globalAlpha = 0.14 * bloom * (0.8 + Math.sin(time * 1.8) * 0.2)
  const gradient = ctx.createLinearGradient(width * 0.18, height * 0.39, width * 0.82, height * 0.59)
  gradient.addColorStop(0, 'rgba(216, 180, 106, 0)')
  gradient.addColorStop(0.5, 'rgba(238, 218, 162, 0.4)')
  gradient.addColorStop(1, 'rgba(216, 180, 106, 0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.ellipse(width * 0.5, height * 0.49, width * 0.42, height * 0.16, Math.sin(time * 0.2) * 0.04, 0, TAU)
  ctx.fill()
  ctx.restore()
}

export function CosmicParticleCanvas({ active, opening = false, onOpeningComplete }: CosmicParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, down: false })
  const onOpeningCompleteRef = useRef(onOpeningComplete)

  useEffect(() => {
    onOpeningCompleteRef.current = onOpeningComplete
  }, [onOpeningComplete])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let frame = 0
    const started = performance.now()
    let openingNotified = false

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particlesRef.current = createParticles(width, height, reducedMotion, opening)
    }

    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current.x = event.clientX
      mouseRef.current.y = event.clientY
    }
    const onPointerDown = () => {
      mouseRef.current.down = true
    }
    const onPointerUp = () => {
      mouseRef.current.down = false
    }

    const render = (now: number) => {
      const elapsed = (now - started) / 1000
      const time = elapsed * (active ? 1 : 0.35)
      const cycle = reducedMotion ? 0.72 : (time / 28) % 1
      const form = reducedMotion ? 1 : smoothstep(0.12, 0.42, cycle)
      const sand = reducedMotion ? 0 : smoothstep(0.5, 0.68, cycle) - smoothstep(0.83, 0.98, cycle)
      const reGather = reducedMotion ? 1 : smoothstep(0.75, 0.95, cycle)
      const openingReady = opening && (reducedMotion || elapsed >= OPENING_COMPLETE_AT)
      const lotusForm = reducedMotion ? 0 : smoothstep(1.05, 4.35, elapsed)
      const lotusExit = reducedMotion ? 1 : smoothstep(5.25, 6.25, elapsed)
      const lotusPresence = lotusForm * (1 - lotusExit)
      const burst = reducedMotion ? 0 : smoothstep(5.2, 6.55, elapsed)
      const titleForm = reducedMotion ? 1 : smoothstep(6.45, 9.05, elapsed)
      const titleBloom = opening ? smoothstep(7.15, 9.25, elapsed) : 0

      if (openingReady && !openingNotified) {
        openingNotified = true
        onOpeningCompleteRef.current?.()
      }

      drawBackground(ctx, width, height, time)
      if (opening) {
        const openingSand = 0.68 * (1 - lotusForm * 0.72) + Math.max(0, 1 - titleForm) * 0.16
        drawDustVeil(ctx, width, height, time, openingSand)
        drawLotusAura(ctx, width, height, time, lotusPresence)
        drawTitleBloom(ctx, width, height, time, titleBloom)
      } else {
        drawDustVeil(ctx, width, height, time, Math.max(0, sand))
      }

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.shadowColor = opening ? 'rgba(216, 180, 106, 0.42)' : 'rgba(238, 243, 240, 0.18)'
      ctx.shadowBlur = opening ? 8 : 2

      for (const particle of particlesRef.current) {
        const sandSweep = (time * 58 + particle.seed * 17) % (width * 1.35)
        const dynamicSandX = particle.sand.x * 0.72 + sandSweep - width * 0.18
        const dynamicSandY = particle.sand.y + Math.sin(time * 0.65 + particle.seed) * height * 0.018
        let targetX = dynamicSandX
        let targetY = dynamicSandY
        let attraction = 0.012
        let damping = 0.86

        if (opening) {
          const lotusBreath = Math.sin(time * 1.05 + particle.seed) * 2.8 * lotusPresence
          const lotusX = particle.lotus.x + Math.cos(particle.seed) * lotusBreath
          const lotusY = particle.lotus.y + Math.sin(particle.seed) * lotusBreath

          if (reducedMotion || elapsed >= OPENING_COMPLETE_AT) {
            targetX = particle.title.x
            targetY = particle.title.y
          } else if (elapsed < 5.2) {
            targetX = lerp(dynamicSandX, lotusX, lotusForm)
            targetY = lerp(dynamicSandY, lotusY, lotusForm)
            attraction = 0.014 + lotusForm * 0.008
            damping = 0.85
          } else if (elapsed < 6.55) {
            targetX = lerp(lotusX, particle.burst.x, burst)
            targetY = lerp(lotusY, particle.burst.y, burst)
            attraction = 0.032
            damping = 0.81
          } else {
            targetX = lerp(particle.burst.x, particle.title.x, titleForm)
            targetY = lerp(particle.burst.y, particle.title.y, titleForm)
            attraction = 0.018 + titleForm * 0.014
            damping = 0.83
          }
        } else {
          const roleTarget = particle.role === 'traveler' ? particle.traveler : particle.lotus
          const formedX = lerp(particle.star.x, roleTarget.x, form)
          const formedY = lerp(particle.star.y, roleTarget.y, form)
          targetX = lerp(lerp(formedX, dynamicSandX, Math.max(0, sand)), roleTarget.x, reGather * 0.75)
          targetY = lerp(lerp(formedY, dynamicSandY, Math.max(0, sand)), roleTarget.y, reGather * 0.75)
        }

        const allowPointer = active && (!opening || openingReady)
        const driftScale = opening && !openingReady ? 0.42 : 1
        const oceanX = Math.sin(time * 0.19 + particle.seed) * (2.2 + particle.star.z * 4.5) * driftScale
        const oceanY = Math.cos(time * 0.16 + particle.seed * 1.7) * (1.4 + particle.star.z * 2.7) * driftScale
        const dxMouse = particle.x - mouseRef.current.x
        const dyMouse = particle.y - mouseRef.current.y
        const mouseDistance = Math.hypot(dxMouse, dyMouse)
        const mouseForce = allowPointer && mouseDistance < 170
          ? (1 - mouseDistance / 170) * (mouseRef.current.down ? 6 : 2.1)
          : 0

        particle.vx += (targetX + oceanX - particle.x) * attraction + (dxMouse / (mouseDistance || 1)) * mouseForce
        particle.vy += (targetY + oceanY - particle.y) * attraction + (dyMouse / (mouseDistance || 1)) * mouseForce + 0.004
        particle.vx *= damping
        particle.vy *= damping
        particle.x += particle.vx
        particle.y += particle.vy

        const lotusGlow = particle.role === 'lotus'
        const travelerGlow = particle.role === 'traveler'
        const sandGlow = sand > 0.05
        const sparkle = smoothstep(0.62, 1, Math.sin(time * 3.8 + particle.seed * 2.1) * 0.5 + 0.5)
        const alpha = clamp(0.3 + particle.star.z * 0.52 + Math.sin(time * 0.8 + particle.seed) * 0.06 + sparkle * 0.1)
        const openingRadius = opening ? 1.08 + lotusPresence * 0.24 + burst * (1 - titleForm) * 0.35 : 1
        const radius = particle.size * (0.65 + particle.star.z * 1.2) * (sandGlow ? 1.2 : 1) * openingRadius

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, radius, 0, TAU)
        ctx.fillStyle = opening
          ? `rgba(${236 + sparkle * 14}, ${190 + sparkle * 34}, ${92 + sparkle * 46}, ${alpha})`
          : sandGlow
            ? `rgba(216, 180, 106, ${alpha})`
            : travelerGlow
              ? `rgba(232, 212, 170, ${alpha * 0.9})`
              : lotusGlow
                ? `rgba(238, 243, 240, ${alpha})`
                : `rgba(74, 122, 155, ${alpha})`
        ctx.fill()
      }

      ctx.restore()
      frame = window.requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    frame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [active, opening])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-screen w-screen overflow-hidden"
    />
  )
}
