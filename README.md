# Landing page — E-book (projeto de portfólio)

[![CI](https://github.com/devthomaseduardo/ebook/actions/workflows/ci.yml/badge.svg)](https://github.com/devthomaseduardo/ebook/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Aplicação web **single-page** para apresentação e conversão de um e-book fictício (“Do zero ao primeiro emprego em programação”). O foco é **UX de vendas**: prova social, urgência, planos, checkout simulado, suporte por chat e componentes reutilizáveis (design system leve em cima de **shadcn/ui** + **Radix**).

> **Propósito:** demonstrar uma landing de produto digital com boas práticas de front-end (React, TypeScript, acessibilidade via primitives, animações e layout responsivo). O conteúdo comercial é **ilustrativo**, não representa um produto real.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Stack técnica](#stack-técnica)
- [Início rápido](#início-rápido)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Documentação](#documentação)
- [Deploy](#deploy)
- [Metadados sugeridos no GitHub](#metadados-sugeridos-no-github)

---

## Funcionalidades

| Área | O que o usuário vê / pode fazer |
|------|----------------------------------|
| **Hero** | Título, subtítulo, CTA principal, prova social com avatares, mock da capa do e-book, fundo animado |
| **Banner de desconto** | Faixa de urgência / promoção no topo |
| **Barra fixa de compra** | Aparece após rolar a página; preço e CTA que levam à área de preços |
| **Dores (pain points)** | Lista de problemas comuns de quem quer entrar na área |
| **Solução e benefícios** | Resposta às dores e benefícios do método |
| **CTAs inline** | Blocos intermediários que rolam até solução ou preços |
| **Preços** | Abas com planos (básico, premium, VIP), contagem regressiva, selos de confiança, CTA fixo no rodapé da viewport |
| **Checkout simulado** | Modal com formulário de cartão, PIX e métodos alternativos (demonstração visual, sem backend de pagamento) |
| **Plataformas** | Logotipos de marketplaces (Hotmart, Kiwify, etc.) |
| **Depoimentos** | Seção de prova social; variante mobile em formato “chat” |
| **Chat de suporte** | Widget flutuante com respostas por palavras-chave (FAQ embutido) |
| **Compras recentes** | Notificações toast simuladas de “fulano comprou” |
| **Rodapé** | Copyright e links institucionais (placeholders) |
| **Tema** | Fundo escuro, acentos em azul/roxo, componentes **Tailwind** |
| **Integração opcional** | Cliente **Supabase** preparado para URL + chave anônima (sem obrigatoriedade para rodar a landing) |
| **Tempo (dev)** | Integração opcional com **Tempo** para rotas de desenvolvimento (`VITE_TEMPO`) |

Detalhes de pastas, decisões de arquitetura e fluxo de build estão em [`docs/DOCUMENTATION.md`](docs/DOCUMENTATION.md).

---

## Stack técnica

| Camada | Tecnologias |
|--------|-------------|
| **Linguagem** | TypeScript |
| **UI** | React 18, React Router 6 |
| **Build** | Vite 5, `@vitejs/plugin-react-swc` |
| **Estilo** | Tailwind CSS 3, tailwindcss-animate, class-variance-authority, tailwind-merge, clsx |
| **Componentes** | Radix UI (acessibilidade), padrão shadcn/ui, Lucide icons |
| **Formulários / validação** | react-hook-form, Zod, @hookform/resolvers |
| **Animações** | Framer Motion |
| **Outros** | embla-carousel, react-day-picker, cmdk (command), vaul (drawer), date-fns |
| **Backend opcional** | `@supabase/supabase-js` |
| **CI** | GitHub Actions (Node 18 / 20 / 22, `npm ci` + `npm run build`) |

Linguagens exibidas na barra do GitHub são inferidas automaticamente a partir dos arquivos do repositório (TypeScript, CSS, etc.).

---

## Início rápido

**Requisitos:** Node.js 18+ e npm.

```bash
git clone https://github.com/devthomaseduardo/ebook.git
cd ebook
npm install
npm run dev
```

Abra o endereço indicado no terminal (por padrão `http://localhost:5173`).

Build de produção:

```bash
npm run build
npm run preview
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz (não versionado) conforme necessário:

| Variável | Descrição |
|----------|-----------|
| `VITE_SUPABASE_URL` | URL do projeto Supabase (opcional) |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima pública Supabase (opcional) |
| `VITE_TEMPO` | Defina como `true` para habilitar rotas do Tempo em desenvolvimento |
| `VITE_BASE_PATH` | Base path da app em produção (ex.: subpasta em GitHub Pages) |
| `TEMPO` | Quando `true`, injeta plugin SWC do Tempo no build |

---

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento Vite |
| `npm run build` | `tsc` + build de produção |
| `npm run preview` | Servir pasta `dist` |
| `npm run lint` | ESLint (se configurado no ambiente) |
| `npm run types:supabase` | Gera tipos TypeScript a partir do projeto Supabase (`SUPABASE_PROJECT_ID`) |

---

## Documentação

- [**Documentação técnica consolidada**](docs/DOCUMENTATION.md) — arquitetura, estrutura de diretórios, módulos de vendas, UI kit, CI/CD e notas de segurança.

---

## Deploy

O artefato é a pasta **`dist`** após `npm run build`. Possibilidades comuns:

- **Hospedagem estática:** Vercel, Netlify, Cloudflare Pages, GitHub Pages (ajustar `VITE_BASE_PATH` se usar subpath).
- **CI:** o workflow em `.github/workflows/ci.yml` valida o build em cada push/PR para `main`.

---

## Metadados sugeridos no GitHub

No repositório, em **About**, configure:

- **Description (exemplo):** *Landing page em React + Vite + TypeScript para e-book digital fictício; shadcn/ui, Framer Motion e checkout simulado.*
- **Website:** URL da demo, se houver.
- **Topics (tags sugeridas):** `react`, `typescript`, `vite`, `tailwindcss`, `shadcn-ui`, `radix-ui`, `framer-motion`, `landing-page`, `ebook`, `frontend`, `supabase`

---

## Licença

Este projeto é disponibilizado sob a licença **MIT** (arquivo [`LICENSE`](LICENSE), se presente no repositório).

---

**Aviso:** textos de vendas, preços, depoimentos e métricas são **fictícios** e servem apenas para compor a interface.
