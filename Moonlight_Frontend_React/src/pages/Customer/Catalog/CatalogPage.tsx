import { CatalogGamesList } from "./sections/CatalogGamesList";
import { useState } from "react";
import { SearchInputBar } from "../../../components/common/Generic/SearchInputBar";
import { CatalogSideBar } from "./sections/CatalogSideBar";
import { useCatalogFilters } from "../../../hooks/filters/customer/useCatalogFilters";
import { SlidersIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../../../components/common/Generic/Button/Button";
import { useUpdateUrlParam } from "../../../hooks/updateUrlParam/useUpdateUrlParam";

export function CatalogPage() {
  const { filters } = useCatalogFilters();
  const { updateURLParam } = useUpdateUrlParam();
  const [title, setTitle] = useState(filters.title ?? "");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex justify-center">
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <CatalogSideBar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="flex-1 min-w-0 justify-center items-center py-5">
        <h1 className="w-full py-5 text-center text-4xl">Catálogo de Jogos:</h1>
        <div className="flex flex-col items-center gap-4 w-full mb-4">
          <SearchInputBar
            classNameDiv="max-w-100"
            placeholder="Pesquise um jogo..."
            name="game"
            value={title}
            onChange={setTitle}
            onSearch={(value) => updateURLParam("title", value)}
          />
          <Button
            onClick={() => setDrawerOpen(true)}
            className="w-fit flex items-center gap-2 px-2 py-2 border border-white/20 rounded-md text-sm text-white hover:bg-white/10 transition-colors"
          >
            <SlidersIcon size={18} />
            Filtros
          </Button>
        </div>
        <CatalogGamesList {...filters} />
      </div>
    </main>
  );
}
