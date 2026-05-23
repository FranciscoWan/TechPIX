import { gsap, ScrollTrigger } from '../lib/gsap'

interface CountUpOptions {
  prefix?: string
  suffix?: string
  decimal?: boolean
  duration?: number
}

export function countUp(el: HTMLElement, target: number, opts: CountUpOptions = {}): ScrollTrigger {
  const { prefix = '', suffix = '', decimal = false, duration = 2 } = opts
  const obj = { val: 0 }

  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate() {
      if (decimal) {
        el.textContent = `${prefix}${obj.val.toFixed(2)}${suffix}`
      } else {
        const formatted = Math.round(obj.val).toLocaleString('pt-BR')
        el.textContent = `${prefix}${formatted}${suffix}`
      }
    },
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
    },
  })

  return ScrollTrigger.getAll().slice(-1)[0]
}
