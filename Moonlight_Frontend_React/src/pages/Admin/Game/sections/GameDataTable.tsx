import { PlusIcon, SlidersIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr";
import { ConfirmModal } from "../../../../components/common/Generic/ConfirmModal";
import { Table } from "../../../../components/common/Generic/Table/Table";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { useMemo, useState } from "react";
import { SearchInputBar } from "../../../../components/common/Generic/SearchInputBar";
import { useUpdateUrlParam } from "../../../../hooks/updateUrlParam/useUpdateUrlParam";
import type { GamePaginatedQueryPayload } from "../../../../@types/game/game.payload";
import { useFetchGamesTable } from "../../../../hooks/fetchItems/table/useFetchGamesTable";
import { useGameTable } from "../../../../hooks/tables/useGameTable";
import { useGameFilters } from "../../../../hooks/filters/admin/useGameFilters";
import { GameFilterSideBar } from "./GameFilterSideBar";


export function GameDataTable() {
  const { filters } = useGameFilters();
  const { updateURLParam } = useUpdateUrlParam();
  const [title, setTitle] = useState(filters.title ?? "");

  const query: GamePaginatedQueryPayload = useMemo(() => ({
    limit: 5,
    random: false,
    title: filters.title,
    category: filters.category,
    launch_date_from: filters.launch_date_from,
    launch_date_to: filters.launch_date_to,
    price_min: filters.price_min,
    price_max: filters.price_max,
    active: filters.active
  }), [filters.category, filters.launch_date_from, filters.launch_date_to, filters.price_max, filters.price_min, filters.title, filters.active]);

  const {games, isLoading, refetch, internalPage, setInternalPage, totalRows} = useFetchGamesTable(query);
  const {GameColumns, confirmDeleteId, setConfirmDeleteId, handleDelete} = useGameTable(refetch);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <GameFilterSideBar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      {confirmDeleteId &&
          <ConfirmModal
              icon={
                  <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                      <WarningIcon size={18} color="#f87171" />
                  </div>
              }
              title="Apagar Registro"
              message="Tem certeza de que deseja apagar este registro?"
              onConfirm={() => handleDelete(confirmDeleteId)}
              onCancel={() => setConfirmDeleteId(null)}
          />
      }
      <Table
          columns={GameColumns}
          data={games || []}
          isLoading={isLoading}
          subHeader
          subHeaderComponent={
            <div className="flex max-md:flex-col items-center justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 p-2 w-full">
                <h3 className="text-left max-md:text-center">Pesquisar por titulo:</h3>
                <div className="flex max-md:flex-col items-center gap-4 w-full">
                  <SearchInputBar
                    classNameDiv="w-full"
                    id="game-title-search"
                    placeholder="Pesquisar titulo.."
                    name="game-title"
                    value={title}
                    onChange={setTitle}
                    onSearch={(value) => updateURLParam("title", value)}
                  />
                  <Button
                    onClick={() => setDrawerOpen(true)}
                    className="shrink-0 w-fit flex items-center gap-2 px-2 py-2 border border-white/20 rounded-md text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    <SlidersIcon size={18} />
                    <span className="max-md:hidden">Filtros</span>
                  </Button>
                </div>
              </div>
              <Button id="game-add-btn" as="link" href="/admin/games/create" variant="cta" className="flex items-center gap-2 px-4 py-2 rounded-md">
                  <PlusIcon size={32} weight="thin" /> Cadastrar Jogo
              </Button>
            </div>
          }
          pageSize={query.limit}
          currentPage={internalPage}
          onPageChange={setInternalPage}
          totalRows={totalRows}
        />
    </>
  )
}
