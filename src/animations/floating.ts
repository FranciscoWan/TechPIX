import { gsap } from '../lib/gsap'

export function startFloating(element: HTMLElement, amplitude = 12, duration = 2.5): void {
  gsap.to(element, {
    y: -amplitude,
    duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
}

export function startFloatingGroup(elements: NodeListOf<HTMLElement> | HTMLElement[], staggerDelay = 0.4): void {
  Array.from(elements).forEach((el, i) => {
    gsap.to(el, {
      y: -10,
      duration: 2.2 + i * 0.3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * staggerDelay,
    })
  })
}
