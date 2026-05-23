export function pauseOnHover(trackEl: HTMLElement): void {
  const inner = trackEl.querySelector<HTMLElement>('.logos__inner')
  if (!inner) return

  trackEl.addEventListener('mouseenter', () => {
    inner.style.animationPlayState = 'paused'
  })
  trackEl.addEventListener('mouseleave', () => {
    inner.style.animationPlayState = 'running'
  })
}
