import { useState } from "react";
import { useCategoryGamesFilters } from "../../../hooks/filters/customer/useCategoryGamesFilters";
import { useUpdateUrlParam } from "../../../hooks/updateUrlParam/useUpdateUrlParam";
import { CategorySideBar } from "./sections/CategorySideBar";
import { SearchInputBar } from "../../../components/common/Generic/SearchInputBar";
import { Button } from "../../../components/common/Generic/Button/Button";
import { SlidersIcon } from "@phosphor-icons/react/dist/ssr";
import { CategoryGamesList } from "./sections/CategoryGameList";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchCategory } from "../../../hooks/fetchItems/fetchOne/useFetchCategory";
import { Spinner } from "../../../components/common/Generic/Spinner";

export function CategoryPage() {
  const { id } = useParams();
  const id_category = Number(id);
  const {category, isLoading} = useFetchCategory(id_category);

  const navigate = useNavigate();
  const { filters } = useCategoryGamesFilters();
  const { updateURLParam } = useUpdateUrlParam();
  const [title, setTitle] = useState(filters.title ?? "");
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (isLoading) {
      return (
          <div className="w-full h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex items-center justify-center">
              <Spinner />
          </div>
      );
  }
  if(!category){
      navigate("/");
      return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex justify-center">
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <CategorySideBar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="flex-1 min-w-0 justify-center items-center py-5">
        <h1 className="w-full py-5 text-center text-4xl">Jogos de {category.name}:</h1>
        <div className="flex flex-col items-center gap-4 w-full mb-4">
          <SearchInputBar
            classNameDiv="max-w-100"
            placeholder={`Pesquise um jogo de ${category.name}...`}
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
        <CategoryGamesList {...filters} category={category.name} />
      </div>
    </main>
  );
}


export default CategoryPage;
