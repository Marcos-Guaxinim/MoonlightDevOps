# Tabela headless (TanStack Table) em vez de componente pronto por plataforma

**Status:** Aceito
**Data:** 2026-09-16

## Contexto

O web já usa `react-data-table-component` pra listagens administrativas (jogos,
pedidos) com paginação server-side, linhas expansíveis e ordenação. Com o
início do desenvolvimento das telas administrativas/de listagem no mobile
(Expo/React Native), essa lib não é reaproveitável: ela renderiza `<table>`,
`<tr>`, `<td>` reais, que não existem em React Native. Qualquer lib de tabela
"pronta" (com UI própria) é, por natureza, presa a uma única plataforma.

## Decisão

Adotar **TanStack Table** (`@tanstack/react-table`) como camada de lógica de
tabela compartilhada entre web e mobile. É uma lib headless — não renderiza
nenhuma marcação própria, só expõe hooks (`useReactTable`) que resolvem
colunas, ordenação, paginação (inclusive server-side via `manualPagination`)
e linhas expansíveis (`getExpandedRowModel`). A camada visual continua sendo
escrita por nós, por plataforma:
- **Web**: `<table>` real, estilizado com as mesmas cores/tokens já usados no
  `tableStyles` anterior.
- **Mobile**: `FlatList` de cards, um card por linha, campos empilhados
  verticalmente — não uma tabela horizontal literal, por limitação de largura
  de tela.

As definições de coluna (`ColumnDef<RowData>[]`) passam a ser o contrato
compartilhado entre as duas plataformas.

## Alternativas consideradas

- **Manter `react-data-table-component` no web e escrever algo do zero pro
  mobile, sem compartilhar nada** — mais simples a curto prazo, mas duplica
  toda lógica de ordenação/paginação/filtros nas duas plataformas pra sempre,
  e qualquer mudança de regra de negócio (ex: nova coluna, nova forma de
  filtrar) precisa ser replicada duas vezes.
- **AG Grid** — mais robusto e também multiplataforma em teoria, mas é uma
  lib pesada, com licenciamento próprio pra features avançadas, e não trouxe
  benefício adicional pro escopo atual do projeto (tabelas administrativas
  simples, sem virtualização de milhares de linhas).

## Consequências

- Migração do `Table.tsx` do web: para de usar a prop-API do
  `react-data-table-component` (`progressPending`, `customStyles`,
  `expandableRows`, etc.) e passa a montar a marcação HTML manualmente sobre
  `useReactTable()`.
- Definições de coluna (`GameColumns`, `OrderColumns`, etc.) migram de
  `TableColumn<RowData>[]` (formato da lib antiga) para
  `ColumnDef<RowData>[]` (formato TanStack) — mudança de contrato em todos os
  hooks `use*Table.ts` existentes.
- Paginação server-side, antes resolvida internamente pela lib, passa a ser
  responsabilidade explícita nossa via `manualPagination: true` +
  `pageCount`, mantendo a mesma prop `onPageChange` já usada pelos
  consumidores (`GameDataTable`, `OrderPage`) — sem quebra de API externa.
- Ganho: qualquer tela de tabela nova no mobile reaproveita a definição de
  colunas e a lógica de estado (ordenação/expansão/paginação) do web,
  escrevendo só a camada de apresentação.
