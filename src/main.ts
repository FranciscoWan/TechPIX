import './styles/reset.css'
import './styles/tokens.css'
import './styles/typography.css'
import './styles/global.css'
import './styles/sections/navbar.css'
import './styles/sections/hero.css'
import './styles/sections/how-it-works.css'
import './styles/sections/dashboard.css'
import './styles/sections/benefits.css'
import './styles/sections/logos.css'
import './styles/sections/qr-simulation.css'
import './styles/sections/stats.css'
import './styles/sections/security.css'
import './styles/sections/testimonials.css'
import './styles/sections/pricing.css'
import './styles/sections/final-cta.css'
import './styles/sections/footer.css'

import { initNavbar } from './sections/navbar'
import { initHero } from './sections/hero'
import { initHowItWorks } from './sections/how-it-works'
import { initDashboard } from './sections/dashboard'
import { initBenefits } from './sections/benefits'
import { initLogos } from './sections/logos'
import { initQRSimulation } from './sections/qr-simulation'
import { initStats } from './sections/stats'
import { initSecurity } from './sections/security'
import { initTestimonials } from './sections/testimonials'
import { initPricing } from './sections/pricing'
import { initFinalCTA } from './sections/final-cta'
import { initFooter } from './sections/footer'

document.addEventListener('DOMContentLoaded', () => {
  initNavbar()
  initHero()
  initHowItWorks()
  initDashboard()
  initBenefits()
  initLogos()
  initQRSimulation()
  initStats()
  initSecurity()
  initTestimonials()
  initPricing()
  initFinalCTA()
  initFooter()
})
