import { gsap } from '../lib/gsap'
import { startFloating } from '../animations/floating'

export function initHero(): void {
  const hero = document.querySelector<HTMLElement>('#hero')
  if (!hero) return

  const label = hero.querySelector<HTMLElement>('.hero__label')
  const title = hero.querySelector<HTMLElement>('.hero__title')
  const description = hero.querySelector<HTMLElement>('.hero__description')
  const actions = hero.querySelector<HTMLElement>('.hero__actions')
  const socialProof = hero.querySelector<HTMLElement>('.hero__social-proof')
  const visual = hero.querySelector<HTMLElement>('.hero__visual')
  const mockup = document.querySelector<HTMLElement>('#heroMockup')
  const notif1 = document.querySelector<HTMLElement>('#heroNotif1')
  const notif2 = document.querySelector<HTMLElement>('#heroNotif2')

  const tl = gsap.timeline({ delay: 0.2 })

  tl.from([label, title, description, actions, socialProof].filter(Boolean), {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
  })

  tl.from(visual, {
    x: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.6')

  if (mockup) startFloating(mockup, 14, 3)

  if (notif1) {
    gsap.from(notif1, { opacity: 0, scale: 0.8, duration: 0.5, delay: 1.2, ease: 'back.out(2)' })
    startFloating(notif1, 6, 2)
  }

  if (notif2) {
    gsap.from(notif2, { opacity: 0, scale: 0.8, duration: 0.5, delay: 1.5, ease: 'back.out(2)' })
    startFloating(notif2, 8, 2.4)
  }

  drawHeroChart()
  animateHeroTransactions(hero)
}

function drawHeroChart(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('#heroChart')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = canvas.offsetWidth || 300
  const h = 80
  canvas.width = w
  canvas.height = h

  const points = [20, 45, 30, 60, 40, 70, 55, 80, 65, 75, 85, 72]
  const stepX = w / (points.length - 1)

  const gradient = ctx.createLinearGradient(0, 0, 0, h)
  gradient.addColorStop(0, 'rgba(37, 99, 235, 0.3)')
  gradient.addColorStop(1, 'rgba(37, 99, 235, 0)')

  ctx.beginPath()
  ctx.moveTo(0, h - (points[0] / 100) * h)
  points.forEach((p, i) => {
    if (i === 0) return
    const x = i * stepX
    const y = h - (p / 100) * h
    const prevX = (i - 1) * stepX
    const prevY = h - (points[i - 1] / 100) * h
    const cpX = (prevX + x) / 2
    ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y)
  })

  ctx.lineTo(w, h)
  ctx.lineTo(0, h)
  ctx.closePath()
  ctx.fillStyle = gradient
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(0, h - (points[0] / 100) * h)
  points.forEach((p, i) => {
    if (i === 0) return
    const x = i * stepX
    const y = h - (p / 100) * h
    const prevX = (i - 1) * stepX
    const prevY = h - (points[i - 1] / 100) * h
    const cpX = (prevX + x) / 2
    ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y)
  })

  ctx.strokeStyle = '#2563eb'
  ctx.lineWidth = 2
  ctx.stroke()
}

function animateHeroTransactions(hero: HTMLElement): void {
  const txs = hero.querySelectorAll<HTMLElement>('.hero__tx')

  gsap.from(txs, {
    x: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15,
    delay: 1.8,
    ease: 'power2.out',
  })
}
