# Documentação técnica — E-book Landing

Este documento descreve a arquitetura, os módulos de negócio (página de vendas), o kit de UI, configuração e operação contínua do repositório.

---

## 1. Visão geral

- **Tipo de aplicação:** SPA (Single Page Application) servida como conteúdo estático após o build.
- **Roteamento:** `react-router-dom`; rota principal `/` renderiza `Home`.
- **Extensão de desenvolvimento:** quando `import.meta.env.VITE_TEMPO === "true"`, rotas adicionais de `tempo-routes` são registradas (ferramenta Tempo).

Não há API própria obrigatória: pagamentos e “compras recentes” são **simulados** no front-end. O cliente Supabase existe para evolução futura (auth, leads, etc.).

---

## 2. Arquitetura lógica

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (SPA)                       │
├─────────────────────────────────────────────────────────┤
│  App.tsx → Routes → Home (composição de seções sales/)    │
│  Componentes ui/ (primitives + shadcn)                   │
│  lib/utils, lib/supabase (opcional)                      │
└─────────────────────────────────────────────────────────┘
          │ opcional
          ▼
┌─────────────────────────────────────────────────────────┐
│  Supabase (projeto remoto — URL + anon key via env)      │
└─────────────────────────────────────────────────────────┘
```

**Fluxo de build:** fonte TypeScript/TSX → compilador `tsc` (checagem) → bundler Vite (SWC) → saída em `dist/`.

---

## 3. Estrutura de diretórios

| Caminho | Responsabilidade |
|---------|------------------|
| `src/main.tsx` | Entrada React; montagem e providers globais |
| `src/App.tsx` | Definição de rotas e lazy/Tempo |
| `src/components/home.tsx` | Orquestra todas as seções da landing |
| `src/components/sales/` | Blocos de marketing: hero, preços, checkout, chat, etc. |
| `src/components/ui/` | Biblioteca de componentes (Radix + Tailwind) |
| `src/lib/` | Utilitários (`cn`) e cliente Supabase |
| `src/stories/` | Stories (Storybook/Tempo — metadados de biblioteca) |
| `public/` | Assets estáticos (imagens, SVG) |
| `.github/workflows/` | Pipeline CI |

---

## 4. Módulos de vendas (`sales/`)

Componentes são, em regra, **apresentacionais**: recebem props opcionais para título, textos e listas.

- **HeroSection:** entrada da página, CTA e prova social.
- **DiscountBanner / StickyBuyBar:** urgência e conversão na navegação.
- **PainPointsSection, SolutionSection, BenefitsSection, BonusesSection:** narrativa de problema → solução.
- **InlineCTA:** CTAs intermediários com scroll programático para âncoras (`#solution`, `#pricing`).
- **PricingSection:** planos em abas, timer, diálogo com **PaymentOptions**.
- **PaymentOptions:** UI de checkout (cartão, PIX, etc.); **não** envia dados a um PSP real sem integração adicional.
- **PlatformLogos:** credibilidade por marketplaces.
- **TestimonialsSection, _MobileTestimonials:** depoimentos; variante mobile estilizada.
- **RecentPurchases:** notificações rotativas (dados mock).
- **ChatbotSupport:** respostas por dicionário de palavras-chave (FAQ embutido).

Qualquer integração real de pagamento ou CRM deve substituir ou complementar esses fluxos com backend seguro e políticas de privacidade adequadas.

---

## 5. Kit de UI (`ui/`)

Baseado em **Radix** (primitivos acessíveis) e **Tailwind**. Padrão compatível com **shadcn/ui** (`components.json` na raiz).

Formulários usam **react-hook-form** + **zod** onde aplicável (`form.tsx`).

Toasts usam `use-toast` + `Toaster` (padrão shadcn).

---

## 6. Configuração relevante

| Arquivo | Uso |
|---------|-----|
| `vite.config.ts` | Plugins React SWC, alias `@`, plugin Tempo, `base` para deploy em subpath |
| `tailwind.config.js` | Tema, animações, design tokens |
| `tsconfig.json` | Paths e modo strict |
| `tempo.config.json` | Configuração de tipografia/experimentos Tempo |

---

## 7. CI/CD

O workflow **CI** (`.github/workflows/ci.yml`) executa:

1. Checkout do código.
2. Matrix Node.js (18.x, 20.x, 22.x).
3. `npm install` e `npm run build`.

Falhas no `tsc` ou no bundle quebram o job — útil para PRs e integridade de `main`.

---

## 8. Segurança e privacidade

- Nunca commitar `.env` com segredos.
- Chave **anon** do Supabase é pública por design, mas **políticas RLS** no projeto Supabase devem restringir leitura/escrita.
- Formulários de cartão neste projeto são **demonstrativos**; para produção use provedor PCI-compliant (Stripe Elements, etc.) e não armazene PAN completo no front.

---

## 9. Extensão e manutenção

- **Novo bloco na home:** criar componente em `sales/`, importar em `home.tsx` e posicionar na ordem desejada.
- **Novo componente reutilizável:** preferir `ui/` seguindo padrões existentes (variantes com `class-variance-authority` quando fizer sentido).
- **Tipos Supabase:** após criar tabelas, rodar `npm run types:supabase` com `SUPABASE_PROJECT_ID` definido.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| **SPA** | Aplicação que carrega uma vez e navega no cliente |
| **CTA** | Call-to-action (botão ou link de conversão) |
| **RLS** | Row Level Security (Supabase/Postgres) |

---

Última atualização: alinhada ao estado do repositório na branch principal documentada no README raiz.
