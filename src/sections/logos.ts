import { gsap } from '../lib/gsap'
import { pauseOnHover } from '../animations/marquee'

export function initLogos(): void {
  const section = document.querySelector<HTMLElement>('#logos')
  if (!section) return

  const label = section.querySelector<HTMLElement>('.logos__label')
  const track = section.querySelector<HTMLElement>('.logos__track')

  if (label) {
    gsap.from(label, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
      },
    })
  }

  if (track) pauseOnHover(track)
}
