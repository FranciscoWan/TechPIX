# Roadmap — Landing Page Fintech PIX

## Stack Tecnológica

| Camada | Tecnologia | Motivo |
|---|---|---|
| Linguagem | **HTML, CSS** | Simplicidade, compreensão |
| Linguagem | **TypeScript** | Tipagem, manutenibilidade |
| Estilização | **Tailwind CSS** + **CSS Modules** | Utilidade + escopos isolados |
| Animações | **GSAP** + **ScrollTrigger** | Animações profissionais |
| Ícones | **Lucide Icons** | Premium, consistente |
| Gráficos | **Recharts** | Gráficos do dashboard fake |
| QR Code | **qrcode.react** | Geração dinâmica de QR |
| Fontes | **Inter** + **Space Grotesk** | Identidade fintech moderna |
| Deploy | **Vercel** | Zero config, CDN global |

---

## Fases do Projeto

### Fase 1 — Setup e Fundação

1. Criar projeto HTML, CSS + TypeScript
2. Configurar Tailwind CSS com design tokens customizados
   - Paleta: azul royal, verde neon, dark background
   - Typography scale
   - Shadows premium
3. Instalar dependências: `gsap`, `lucide`, `qrcode`, `recharts`
4. Criar estrutura de pastas:

```
/components
  /sections     ← cada section isolada
  /ui           ← botões, cards, badges
  /animations   ← hooks GSAP reutilizáveis
/lib
  /gsap.ts      ← configuração global GSAP
```

---

### Fase 2 — Sistema de Design (antes de codar sections)

5. Criar componentes base:
   - `Button` (variantes: primary, outline, ghost)
   - `Badge` ("Novo", "Popular")
   - `GradientCard`
   - `AnimatedCounter` (hook)
6. Definir variáveis CSS globais: `--color-primary`, `--glow-blue`, `--glow-green`
7. Configurar GSAP + ScrollTrigger globalmente

---

### Fase 3 — Desenvolvimento das Sections

| Ordem | Section | Prioridade |
|---|---|---|
| 1 | **Navbar** | Base para tudo |
| 2 | **Hero** | Impacto inicial — mais complexa |
| 3 | **Como Funciona** | Timeline animada |
| 4 | **Dashboard** | Section principal |
| 5 | **Benefícios** | Grid de cards |
| 6 | **Logos/Parceiros** | Marquee |
| 7 | **Simulação QR Code** | Interativa |
| 8 | **Estatísticas** | CountUp |
| 9 | **Segurança** | Visual enterprise |
| 10 | **Depoimentos** | Carrossel |
| 11 | **Pricing** | Cards SaaS |
| 12 | **CTA Final** | Fechamento |
| 13 | **Footer** | Links + sociais |

---

### Fase 4 — Animações GSAP por Section

#### Hero
- `gsap.from(elements, { stagger: 0.15, y: 60, opacity: 0 })`
- Floating loop no mockup do dashboard
- Gradient background animado com `@keyframes`
- Notificações PIX surgindo com timeline

#### Como Funciona
- ScrollTrigger: linha SVG crescendo via `strokeDashoffset`
- Cards revelando em sequência conforme scroll

#### Dashboard
- CountUp nos números de saldo
- Recharts com animação de entrada
- Barras crescendo no ScrollTrigger

#### Logos / Parceiros
- CSS marquee infinito (performático, sem GSAP puro)
- Fade in/out nas bordas com gradient mask

#### Benefícios
- Hover 3D com `perspective` + `rotateX/rotateY`
- `gsap.to` no `mousemove` por card

#### Segurança
- Background particles com canvas (leve)
- Glow pulse nos ícones de escudo/lock

#### Simulação QR Code
- Input `onChange` → regenera QR em tempo real
- Timer countdown animado
- Status "Pago" com confetti leve

#### Estatísticas
- `IntersectionObserver` → CountUp trigger
- `gsap.to({ val: 0 }, { val: 12000000, onUpdate })`

#### Depoimentos
- Auto-slide com GSAP timeline pausável no hover
- Parallax sutil nos avatares

#### Pricing
- Scale up no plano "Business" por padrão
- Hover com glow border animado

#### CTA Final
- Entrada cinematográfica: `scale` + `opacity`
- Background com gradient em motion

---

### Fase 5 — Performance e Polimento

- Lazy loading nas sections abaixo da dobra
- Otimizar imagens com `next/image`
- Revisar animações em mobile (reduzir/desativar)
- Checar `prefers-reduced-motion`
- Lighthouse score ≥ 90
- SEO: meta tags, OG image, sitemap

---

## Estrutura de Pastas Final

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx          ← monta todas as sections
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Benefits.tsx
│   │   ├── Logos.tsx
│   │   ├── QRSimulation.tsx
│   │   ├── Stats.tsx
│   │   ├── Security.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   └── GradientCard.tsx
│   └── animations/
│       ├── useCountUp.ts
│       ├── useScrollReveal.ts
│       └── useFloating.ts
└── lib/
    └── gsap.ts
```

