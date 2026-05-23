import { gsap } from '../lib/gsap'
import { createQRCode } from '../lib/qr'

export function initQRSimulation(): void {
  const section = document.querySelector<HTMLElement>('#qr-simulation')
  if (!section) return

  const header = section.querySelectorAll<HTMLElement>('[data-animate]')
  gsap.from(header, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
    },
  })

  const amountInput = document.querySelector<HTMLInputElement>('#qrAmount')
  const descInput = document.querySelector<HTMLInputElement>('#qrDescription')
  const displayAmount = document.querySelector<HTMLElement>('#qrDisplayAmount')
  const container = document.querySelector<HTMLElement>('#qrCodeContainer')
  const payBtn = document.querySelector<HTMLButtonElement>('#qrPayBtn')
  const resetBtn = document.querySelector<HTMLButtonElement>('#qrResetBtn')
  const qrCard = document.querySelector<HTMLElement>('#qrCard')
  const qrSuccess = document.querySelector<HTMLElement>('#qrSuccess')
  const countdown = document.querySelector<HTMLElement>('#qrCountdown')

  if (!container) return

  let qr = createQRCode(container, buildQRText('50', 'Pedido #1234'))
  let timerInterval: ReturnType<typeof setInterval> | null = null
  let secondsLeft = 300

  startTimer()

  function buildQRText(amount: string, desc: string): string {
    return `TechPIX|${amount}|${desc}|${Date.now()}`
  }

  function updateQR(): void {
    const amount = amountInput?.value ?? '50'
    const desc = descInput?.value ?? 'Pedido #1234'
    const formatted = `R$ ${Number(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    if (displayAmount) displayAmount.textContent = formatted
    qr.update(buildQRText(amount, desc))
    resetTimer()
  }

  function startTimer(): void {
    if (timerInterval) clearInterval(timerInterval)
    timerInterval = setInterval(() => {
      secondsLeft--
      if (countdown) {
        const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
        const s = String(secondsLeft % 60).padStart(2, '0')
        countdown.textContent = `${m}:${s}`
      }
      if (secondsLeft <= 0) {
        if (timerInterval) clearInterval(timerInterval)
        updateQR()
      }
    }, 1000)
  }

  function resetTimer(): void {
    secondsLeft = 300
    if (countdown) countdown.textContent = '05:00'
    startTimer()
  }

  amountInput?.addEventListener('input', updateQR)
  descInput?.addEventListener('input', updateQR)

  payBtn?.addEventListener('click', () => {
    if (timerInterval) clearInterval(timerInterval)

    if (qrCard && qrSuccess) {
      gsap.to(qrCard, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' })
      qrSuccess.setAttribute('aria-hidden', 'false')
      gsap.fromTo(qrSuccess, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' })
    }
  })

  resetBtn?.addEventListener('click', () => {
    if (qrCard && qrSuccess) {
      qrSuccess.setAttribute('aria-hidden', 'true')
      gsap.to(qrSuccess, { opacity: 0, duration: 0.2 })
      gsap.to(qrCard, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
    }
    resetTimer()
  })
}
