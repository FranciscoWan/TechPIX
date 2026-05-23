import { gsap } from '../lib/gsap'

export function initSecurity(): void {
  const section = document.querySelector<HTMLElement>('#security')
  if (!section) return

  const content = section.querySelectorAll<HTMLElement>('.security__content [data-animate]')
  const visual = section.querySelector<HTMLElement>('.security__visual')
  const items = section.querySelectorAll<HTMLElement>('.security__item')
  const badges = section.querySelectorAll<HTMLElement>('.security__badge')

  gsap.from(content, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
    },
  })

  gsap.from(items, {
    x: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.security__list'),
      start: 'top 80%',
    },
  })

  if (visual) {
    gsap.from(visual, {
      x: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: visual,
        start: 'top 80%',
      },
    })
  }

  gsap.from(badges, {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: section.querySelector('.security__badges'),
      start: 'top 85%',
    },
  })

  initParticles(section)
}

function initParticles(section: HTMLElement): void {
  const canvas = document.querySelector<HTMLCanvasElement>('#securityCanvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = section.offsetWidth
  canvas.height = section.offsetHeight

  const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }> = []

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.1,
    })
  }

  function draw(): void {
    if (!ctx || !canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`
      ctx.fill()
    })

    particles.forEach((p, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
        if (dist < 100) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.08 * (1 - dist / 100)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })
    })

    requestAnimationFrame(draw)
  }

  draw()

  window.addEventListener('resize', () => {
    canvas.width = section.offsetWidth
    canvas.height = section.offsetHeight
  }, { passive: true })
}
