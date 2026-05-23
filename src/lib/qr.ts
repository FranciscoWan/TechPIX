declare const QRCode: {
  new (el: HTMLElement, options: { text: string; width: number; height: number; colorDark: string; colorLight: string; correctLevel: number }): {
    clear: () => void
    makeCode: (text: string) => void
  }
  CorrectLevel: { L: number; M: number; Q: number; H: number }
}

export function createQRCode(el: HTMLElement, text: string): { update: (t: string) => void } {
  const qr = new QRCode(el, {
    text,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  })

  return {
    update(newText: string) {
      qr.clear()
      qr.makeCode(newText)
    },
  }
}
