/** Petal-by-petal lotus geometry — exact port of CosmicParticleCanvas.lotusTarget */

const TAU = Math.PI * 2

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function rotate(x: number, y: number, angle: number) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return { x: x * c - y * s, y: x * s + y * c }
}

export type LotusPoint = { x: number; y: number; z: number }

/** Same algorithm as CosmicParticleCanvas.lotusTarget — call once per particle at init. */
export function lotusTarget(width: number, height: number, index: number): LotusPoint {
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

export function lotusLayer(index: number): number {
  return index % 4
}

export function lotusLayerReveal(index: number): number {
  return (index % 4) / 3
}

/** Apply slow rotation + bloom open around lotus center. */
export function applyLotusMotion(
  width: number,
  height: number,
  base: LotusPoint,
  bloom: number,
  rotation: number,
): { x: number; y: number } {
  const cx = width * 0.5
  const cy = height * 0.55
  const open = 0.1 + bloom * 0.9
  const dx = (base.x - cx) * open
  const dy = (base.y - cy) * open
  const r = rotate(dx, dy, rotation)
  return { x: cx + r.x, y: cy + r.y }
}

export function burstFromLotus(
  width: number,
  height: number,
  lotus: LotusPoint,
  seed: number,
): { x: number; y: number } {
  const cx = width * 0.5
  const cy = height * 0.55
  const dx = lotus.x - cx
  const dy = lotus.y - cy
  const distance = Math.hypot(dx, dy) || 1
  const scale = Math.min(width, height)
  const blast = scale * (0.18 + (seed % 1) * 0.24)
  return {
    x: lotus.x + (dx / distance) * blast + Math.sin(seed * 3) * scale * 0.06,
    y: lotus.y + (dy / distance) * blast + Math.cos(seed * 2) * scale * 0.05,
  }
}

export function sampleTitleLetters(width: number, height: number, maxPoints = 680): { x: number; y: number }[] {
  const sampleW = Math.min(1280, Math.floor(width * 0.9))
  const sampleH = Math.max(200, Math.floor(height * 0.32))
  const c = document.createElement('canvas')
  c.width = sampleW
  c.height = sampleH
  const ctx = c.getContext('2d')
  const centerY = height * 0.26
  if (!ctx) return [{ x: width / 2, y: centerY }]

  const fontSize = Math.min(sampleW / 6.2, sampleH / 2.25)
  ctx.clearRect(0, 0, sampleW, sampleH)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `300 ${fontSize}px "Cormorant Garamond", "EB Garamond", Georgia, serif`
  ctx.fillText('REFRAME', sampleW / 2, sampleH / 2 - fontSize * 0.48)
  ctx.fillText('DESTINY', sampleW / 2, sampleH / 2 + fontSize * 0.48)

  const data = ctx.getImageData(0, 0, sampleW, sampleH).data
  const stride = Math.max(2, Math.floor(sampleW / 520))
  const candidates: { x: number; y: number }[] = []
  const offsetX = width * 0.5 - sampleW / 2
  const offsetY = centerY - sampleH / 2

  for (let y = 0; y < sampleH; y += stride) {
    for (let x = 0; x < sampleW; x += stride) {
      const i = (y * sampleW + x) * 4
      if (data[i + 3] > 40) {
        candidates.push({
          x: offsetX + x + (Math.random() - 0.5) * 0.8,
          y: offsetY + y + (Math.random() - 0.5) * 0.8,
        })
      }
    }
  }

  if (!candidates.length) return [{ x: width / 2, y: centerY }]

  for (let i = candidates.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[candidates[i], candidates[j]] = [candidates[j], candidates[i]]
  }

  if (candidates.length <= maxPoints) return candidates
  const step = candidates.length / maxPoints
  return Array.from({ length: maxPoints }, (_, i) => candidates[Math.floor(i * step)])
}

/** @deprecated use sampleTitleLetters */
export function buildTitlePoints(width: number, height: number, count: number): { x: number; y: number }[] {
  const letters = sampleTitleLetters(width, height, count)
  return Array.from({ length: count }, (_, i) => letters[i % letters.length])
}

export function sandTarget(width: number, height: number, seed: number): { x: number; y: number } {
  const x = ((seed * 17.3) % 1) * width * 1.32 - width * 0.16
  const wave = Math.sin(x * 0.006 + seed) * height * 0.06
  return {
    x,
    y: height * (0.43 + (seed % 1) * 0.23) + wave,
  }
}
