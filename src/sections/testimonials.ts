import { gsap } from '../lib/gsap'

export function initTestimonials(): void {
  const section = document.querySelector<HTMLElement>('#testimonials')
  if (!section) return

  const header = section.querySelectorAll<HTMLElement>('.testimonials__header [data-animate]')
  const track = document.querySelector<HTMLElement>('#testimonialsTrack')
  const dotsContainer = document.querySelector<HTMLElement>('#testimonialsDots')
  const prevBtn = document.querySelector<HTMLButtonElement>('#testimonialsPrev')
  const nextBtn = document.querySelector<HTMLButtonElement>('#testimonialsNext')

  gsap.from(header, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.testimonials__header'),
      start: 'top 80%',
    },
  })

  if (!track) return

  const cards = track.querySelectorAll<HTMLElement>('.testimonials__card')
  const total = cards.length
  let current = 0
  let autoSlideId: ReturnType<typeof setInterval> | null = null

  function getVisibleCount(): number {
    const w = window.innerWidth
    if (w < 640) return 1
    if (w < 1024) return 2
    return 3
  }

  function getOffset(): number {
    if (!cards[0]) return 0
    return cards[0].offsetWidth + 20
  }

  function buildDots(): void {
    if (!dotsContainer) return
    dotsContainer.innerHTML = ''
    const visible = getVisibleCount()
    const count = Math.max(total - visible + 1, 1)
    for (let i = 0; i < count; i++) {
      const btn = document.createElement('button')
      btn.className = `testimonials__dot${i === current ? ' testimonials__dot--active' : ''}`
      btn.setAttribute('aria-label', `Ir para depoimento ${i + 1}`)
      btn.addEventListener('click', () => goTo(i))
      dotsContainer.appendChild(btn)
    }
  }

  function updateDots(): void {
    dotsContainer?.querySelectorAll('.testimonials__dot').forEach((d, i) => {
      d.classList.toggle('testimonials__dot--active', i === current)
    })
  }

  function goTo(index: number): void {
    const visible = getVisibleCount()
    const maxIndex = Math.max(total - visible, 0)
    current = Math.min(Math.max(index, 0), maxIndex)
    const offset = current * getOffset()
    gsap.to(track, { x: -offset, duration: 0.5, ease: 'power3.out' })
    updateDots()
  }

  prevBtn?.addEventListener('click', () => {
    goTo(current - 1)
    resetAutoSlide()
  })

  nextBtn?.addEventListener('click', () => {
    goTo(current + 1)
    resetAutoSlide()
  })

  function startAutoSlide(): void {
    autoSlideId = setInterval(() => {
      const visible = getVisibleCount()
      const maxIndex = Math.max(total - visible, 0)
      goTo(current >= maxIndex ? 0 : current + 1)
    }, 4000)
  }

  function resetAutoSlide(): void {
    if (autoSlideId) clearInterval(autoSlideId)
    startAutoSlide()
  }

  section.addEventListener('mouseenter', () => {
    if (autoSlideId) clearInterval(autoSlideId)
  })
  section.addEventListener('mouseleave', startAutoSlide)

  buildDots()
  startAutoSlide()

  window.addEventListener('resize', () => {
    buildDots()
    goTo(0)
  }, { passive: true })

  gsap.from(cards, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.testimonials__track-outer'),
      start: 'top 80%',
    },
  })
}
