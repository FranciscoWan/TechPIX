import { gsap } from '../lib/gsap'

export function initFooter(): void {
  const footer = document.querySelector<HTMLElement>('#footer')
  if (!footer) return

  gsap.from(footer.querySelectorAll<HTMLElement>('.footer__brand, .footer__nav-col'), {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: footer,
      start: 'top 90%',
    },
  })
}
