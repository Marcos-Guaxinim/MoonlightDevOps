import { PlusIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr";
import { ConfirmModal } from "../../../../components/common/Generic/ConfirmModal";
import { Table } from "../../../../components/common/Generic/Table/Table";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { useMemo, useState } from "react";
import { SearchInputBar } from "../../../../components/common/Generic/SearchInputBar";
import { useUpdateUrlParam } from "../../../../hooks/updateUrlParam/useUpdateUrlParam";
import type { CategoryPaginatedQueryPayload } from "../../../../@types/category/category.payload";
import { useCategoryTable } from "../../../../hooks/tables/useCategoryTable";
import { useCategoryFilters } from "../../../../hooks/filters/admin/useCategoryFilters";
import { useFetchCategoriesTable } from "../../../../hooks/fetchItems/table/useFetchCategoriesTable";

export function CategoryDataTable() {
  const { filters } = useCategoryFilters();
  const { updateURLParam } = useUpdateUrlParam();
  const [name, setName] = useState(filters.name ?? "");

  const query: CategoryPaginatedQueryPayload = useMemo(() => ({
      limit: 5,
      random: false,
      name: filters.name,
  }), [filters.name]);

  const {categories, isLoading, refetch, internalPage, setInternalPage, totalRows } = useFetchCategoriesTable(query);
  const { CategoryColumns, confirmDeleteId, setConfirmDeleteId, handleDelete } = useCategoryTable(refetch);

  return (
    <>
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
          columns={CategoryColumns}
          data={categories || []}
          isLoading={isLoading}
          subHeader
          subHeaderComponent={
            <div className="flex max-md:flex-col items-center justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 p-2 w-full">
                <h3 className="text-left max-md:text-center">Pesquisar por nome:</h3>
                <div className="flex max-md:flex-col items-center gap-4 w-full">
                  <SearchInputBar
                    classNameDiv="w-full"
                    id="category-name-search"
                    placeholder="Pesquisar nome.."
                    name="category-name"
                    value={name}
                    onChange={setName}
                    onSearch={(value) => updateURLParam("name", value)}
                  />
                </div>
              </div>
              <Button id="category-add-btn" as="link" href="/admin/categories/create" variant="cta" className="flex items-center gap-2 px-4 py-2 rounded-md">
                  <PlusIcon size={32} weight="thin" /> Cadastrar Categoria
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
