# Suporte a tema claro/escuro no frontend web via CSS custom properties

**Status:** Proposto
**Data:** 2026-09-10

## Contexto
O frontend web (Vite/Tailwind v4) foi construído originalmente só com
tema escuro fixo, declarado via bloco `@theme` em `global.css`. O
app mobile (Expo/RN) já implementa dark/light via `ThemeContext` e
`theme-pattern.ts`, com os nomes de token já unificados entre as
duas plataformas. Falta ao web um mecanismo equivalente de alternância.

## Decisão
Usar um atributo `data-theme` no elemento raiz (`<html>`), com um
segundo bloco de CSS custom properties em `:root[data-theme="light"]`
sobrescrevendo os valores de `@theme`. A cor inicial segue a ordem:
preferência salva em `localStorage` > `prefers-color-scheme` do SO >
fallback para `dark`. Aplicado via script inline no `index.html` para
evitar flash de tema incorreto no primeiro paint.

## Alternativas consideradas
- Duplicar classes Tailwind por tema (`dark:bg-night light:bg-night-light`):
  descartado — expande a superfície de cada componente e não aproveita
  o suporte nativo do Tailwind v4 a variáveis CSS reais.
- Depender só de `prefers-color-scheme` sem persistência manual:
  descartado — não permite o usuário escolher manualmente contra a
  preferência do SO.

## Consequências
- Web e mobile passam a compartilhar o mesmo vocabulário de tokens
  de cor (ver rename em `theme-pattern.ts`), reduzindo divergência
  visual entre plataformas.
- Precisa de um pequeno bootstrap (script inline) no `index.html`
  para evitar flash de tema.
- Nenhuma mudança de schema/backend — decisão isolada de frontend.
