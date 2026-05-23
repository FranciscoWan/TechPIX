import { gsap, ScrollTrigger } from '../lib/gsap'

export function revealOnScroll(container: HTMLElement, selector = '[data-animate]'): void {
  const elements = container.querySelectorAll<HTMLElement>(selector)
  if (!elements.length) return

  gsap.from(elements, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
    },
  })
}

export function revealStagger(container: HTMLElement, selector = '[data-animate]'): ScrollTrigger {
  const elements = container.querySelectorAll<HTMLElement>(selector)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
    },
  })

  tl.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
  })

  return ScrollTrigger.getAll().slice(-1)[0]
}
