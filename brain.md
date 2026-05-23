---
name: brain-techpix
description: Panorama geral do projeto TechPIX — decisões, arquitetura, problemas e soluções
metadata:
  type: project
---

# 🧠 Brain — TechPIX Landing Page

> Documento vivo. Atualizado a cada sessão de desenvolvimento.

## Status Geral

| Item | Status |
|---|---|
| Setup Vite + TS | ✅ Concluído |
| tokens.css + reset.css | ✅ Concluído |
| src/lib/gsap.ts | ✅ Concluído |
| Navbar | ✅ Concluído |
| Hero | ✅ Concluído |
| Como Funciona | ✅ Concluído |
| Dashboard | ✅ Concluído |
| Benefícios | ✅ Concluído |
| Logos/Parceiros | ✅ Concluído |
| Simulação QR Code | ✅ Concluído |
| Estatísticas | ✅ Concluído |
| Segurança | ✅ Concluído |
| Depoimentos | ✅ Concluído |
| Pricing | ✅ Concluído |
| CTA Final | ✅ Concluído |
| Footer | ✅ Concluído |
| Polimento geral | ✅ Concluído |

---

## Arquitetura

### Stack escolhida
- **HTML5 semântico** + **CSS puro** (custom properties, BEM)
- **TypeScript** compilado via Vite
- **GSAP 3** + ScrollTrigger para todas as animações
- **Vite** como bundler/dev server

> O roadmap mencionava Tailwind + React/Next, mas o CLAUDE.md define HTML+CSS+TS puro. Seguimos o CLAUDE.md como fonte de verdade.

### Estrutura de arquivos
```
src/
  main.ts                  ← DOMContentLoaded, inicializa tudo
  styles/
    reset.css
    tokens.css             ← todas as custom properties
    typography.css
    sections/              ← um .css por section
  sections/                ← um .ts por section (export function initXxx)
  animations/              ← utilitários GSAP reutilizáveis
  lib/
    gsap.ts                ← registra plugins uma única vez
```

---

## Decisões Técnicas

### Por que não Tailwind?
O CLAUDE.md especifica CSS puro com custom properties. O roadmap mencionava Tailwind mas o CLAUDE.md é a fonte de verdade do projeto. CSS puro dá mais controle sobre as animações GSAP e evita conflitos com purge.

### Animações
- `gsap.from` sempre para entradas (não `gsap.to` com estado no CSS)
- ScrollTrigger com `trigger` explícito em toda animação fora da Hero
- Floating loop na Hero sem ScrollTrigger (animação contínua)
- CountUp via objeto `{ val: 0 }` com `onUpdate`

### Marquee dos parceiros
- CSS `@keyframes` puro (mais performático que GSAP para loop infinito)
- Fade nas bordas com `mask-image: linear-gradient`

### QR Code
- `qrcodejs` via CDN no index.html (biblioteca vanilla, sem npm)
- Geração dinâmica no input `change`

---

## Problemas & Soluções

### (sessão inicial — 2026-05-23)
- **Problema**: Projeto em branco, sem nenhum arquivo criado além da documentação
- **Solução**: Build completo do zero seguindo a ordem do CLAUDE.md

- **Problema**: `npm create vite@latest . -- --template vanilla-ts --yes` retornou "Operation cancelled" por conta do diretório não estar vazio (havia os arquivos .md e .obsidian)
- **Solução**: Criação manual do `package.json`, `tsconfig.json` e `vite.config.ts`, depois `npm install`

- **Problema**: 3 erros TypeScript no build — `ScrollTrigger` importado mas não usado em `benefits.ts` e `how-it-works.ts`, e variável `cardWidth` declarada mas não usada em `testimonials.ts`
- **Solução**: Removidos os imports desnecessários e a variável morta. TypeScript passou limpo com `tsc --noEmit`

- **Problema**: `qrcodejs` não tem tipos TypeScript nativos
- **Solução**: Declaração manual da interface `QRCode` no arquivo `src/lib/qr.ts` via `declare const`

---

## Links Internos

- [[roadmap-landing-pix]] — fases e ordem de desenvolvimento
- [[CLAUDE.md]] — convenções e regras do projeto

---

## Sessões

### 2026-05-23
- Criação completa da landing page do zero
- Setup Vite + TypeScript
- Todas as 13 sections implementadas
- Animações GSAP configuradas em cada section
