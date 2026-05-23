import { gsap } from '../lib/gsap'

export function initBenefits(): void {
  const section = document.querySelector<HTMLElement>('#benefits')
  if (!section) return

  const header = section.querySelectorAll<HTMLElement>('.benefits__header [data-animate]')
  const cards = section.querySelectorAll<HTMLElement>('.benefits__card')

  gsap.from(header, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.benefits__header'),
      start: 'top 80%',
    },
  })

  gsap.from(cards, {
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.benefits__grid'),
      start: 'top 80%',
    },
  })

  cards.forEach(card => {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 800,
      })
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power3.out',
      })
    })
  })
}
