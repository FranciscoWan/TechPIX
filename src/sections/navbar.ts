import { gsap } from '../lib/gsap'

export function initNavbar(): void {
  const navbar = document.querySelector<HTMLElement>('.navbar')
  const toggle = document.querySelector<HTMLButtonElement>('.navbar__toggle')
  const mobileMenu = document.querySelector<HTMLElement>('.navbar__mobile-menu')
  const mobileLinks = document.querySelectorAll<HTMLAnchorElement>('.navbar__mobile-link, .navbar__btn-primary--mobile')

  if (!navbar) return

  gsap.from(navbar, {
    y: -80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  })

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar--scrolled')
    } else {
      navbar.classList.remove('navbar--scrolled')
    }
  }, { passive: true })

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', String(!isOpen))
    mobileMenu?.classList.toggle('navbar__mobile-menu--open', !isOpen)
    mobileMenu?.setAttribute('aria-hidden', String(isOpen))
  })

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle?.setAttribute('aria-expanded', 'false')
      mobileMenu?.classList.remove('navbar__mobile-menu--open')
      mobileMenu?.setAttribute('aria-hidden', 'true')
    })
  })
}
