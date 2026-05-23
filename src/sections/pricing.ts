import { gsap } from '../lib/gsap'

export function initPricing(): void {
  const section = document.querySelector<HTMLElement>('#pricing')
  if (!section) return

  const header = section.querySelectorAll<HTMLElement>('.pricing__header [data-animate]')
  const cards = section.querySelectorAll<HTMLElement>('.pricing__card')

  gsap.from(header, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.pricing__header'),
      start: 'top 80%',
    },
  })

  gsap.from(cards, {
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.pricing__grid'),
      start: 'top 80%',
    },
  })

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('pricing__card--featured')) {
        gsap.to(card, { borderColor: 'rgba(37, 99, 235, 0.25)', duration: 0.3 })
      }
    })
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('pricing__card--featured')) {
        gsap.to(card, { borderColor: 'var(--color-border)', duration: 0.3 })
      }
    })
  })
}
