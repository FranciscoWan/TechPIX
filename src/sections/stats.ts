import { gsap } from '../lib/gsap'
import { countUp } from '../animations/count-up'

export function initStats(): void {
  const section = document.querySelector<HTMLElement>('#stats')
  if (!section) return

  const header = section.querySelectorAll<HTMLElement>('.stats__header [data-animate]')
  const cards = section.querySelectorAll<HTMLElement>('.stats__card')

  gsap.from(header, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.stats__header'),
      start: 'top 80%',
    },
  })

  gsap.from(cards, {
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.stats__grid'),
      start: 'top 80%',
    },
  })

  const statValues = section.querySelectorAll<HTMLElement>('.stats__value[data-count]')
  statValues.forEach(el => {
    const raw = el.dataset['count'] ?? '0'
    const target = parseFloat(raw)
    const prefix = el.dataset['prefix'] ?? ''
    const suffix = el.dataset['suffix'] ?? ''
    const decimal = el.dataset['decimal'] === 'true'

    countUp(el, target, { prefix, suffix, decimal })
  })
}
