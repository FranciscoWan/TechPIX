import { gsap, ScrollTrigger } from '../lib/gsap'
import { countUp } from '../animations/count-up'

export function initDashboard(): void {
  const section = document.querySelector<HTMLElement>('#dashboard')
  if (!section) return

  const header = section.querySelectorAll<HTMLElement>('.dashboard__header [data-animate]')
  const preview = section.querySelector<HTMLElement>('.dashboard__preview')

  gsap.from(header, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.dashboard__header'),
      start: 'top 80%',
    },
  })

  if (preview) {
    gsap.from(preview, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: preview,
        start: 'top 80%',
      },
    })
  }

  const kpiValues = section.querySelectorAll<HTMLElement>('.dashboard__kpi-value[data-count]')
  kpiValues.forEach(el => {
    const target = Number(el.dataset['count'])
    const isRevenue = el.textContent?.includes('R$') ?? false
    const prefix = isRevenue ? 'R$ ' : ''
    const suffix = el.textContent?.includes('%') ? '%' : ''

    countUp(el, target, { prefix, suffix })
  })

  drawDashboardChart()
}

function drawDashboardChart(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('#dashboardChart')
  if (!canvas) return

  ScrollTrigger.create({
    trigger: canvas,
    start: 'top 85%',
    onEnter: () => renderChart(canvas),
    once: true,
  })
}

function renderChart(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const parent = canvas.parentElement
  const w = parent ? parent.offsetWidth : 800
  const h = 120
  canvas.width = w
  canvas.height = h

  const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
  const values = [42000, 58000, 35000, 72000, 65000, 80000, 48000]
  const maxVal = Math.max(...values)
  const barW = (w - 80) / labels.length
  const barGap = barW * 0.3

  const gradient = ctx.createLinearGradient(0, 0, 0, h - 30)
  gradient.addColorStop(0, '#2563eb')
  gradient.addColorStop(1, '#10b981')

  const obj = { progress: 0 }
  gsap.to(obj, {
    progress: 1,
    duration: 1,
    ease: 'power2.out',
    onUpdate() {
      ctx.clearRect(0, 0, w, h)
      values.forEach((val, i) => {
        const barH = ((val / maxVal) * (h - 40)) * obj.progress
        const x = 40 + i * barW + barGap / 2
        const y = h - 30 - barH

        ctx.fillStyle = gradient
        const radius = 4
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + barW - barGap - radius, y)
        ctx.arcTo(x + barW - barGap, y, x + barW - barGap, y + radius, radius)
        ctx.lineTo(x + barW - barGap, y + barH)
        ctx.lineTo(x, y + barH)
        ctx.lineTo(x, y + radius)
        ctx.arcTo(x, y, x + radius, y, radius)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = '#64748b'
        ctx.font = '11px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(labels[i], x + (barW - barGap) / 2, h - 10)
      })
    },
  })
}
