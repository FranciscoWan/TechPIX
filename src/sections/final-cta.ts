import { gsap } from '../lib/gsap'

export function initFinalCTA(): void {
  const section = document.querySelector<HTMLElement>('#final-cta')
  if (!section) return

  const content = section.querySelector<HTMLElement>('.final-cta__content')

  if (content) {
    gsap.from(content, {
      scale: 0.92,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: content,
        start: 'top 80%',
      },
    })

    const children = content.querySelectorAll<HTMLElement>('*:not(.final-cta__actions *)')
    gsap.from(children, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: content,
        start: 'top 75%',
      },
    })
  }
}
