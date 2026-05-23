import { gsap } from '../lib/gsap'

export function initHowItWorks(): void {
  const section = document.querySelector<HTMLElement>('#how-it-works')
  if (!section) return

  const header = section.querySelectorAll<HTMLElement>('.how-it-works__header [data-animate]')
  const steps = section.querySelectorAll<HTMLElement>('.how-it-works__step')
  const code = section.querySelector<HTMLElement>('.how-it-works__code')
  const path = document.querySelector<SVGPathElement>('#howItWorksPath')

  gsap.from(header, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section.querySelector('.how-it-works__header'),
      start: 'top 80%',
    },
  })

  steps.forEach((step, i) => {
    gsap.from(step, {
      x: -40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 80%',
      },
      delay: i * 0.1,
    })
  })

  if (path) {
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section.querySelector('.how-it-works__steps'),
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 1,
      },
    })
  }

  if (code) {
    gsap.from(code, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: code,
        start: 'top 85%',
      },
    })
  }
}
