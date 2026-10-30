import { PlusIcon, SlidersIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr";
import { ConfirmModal } from "../../../../components/common/Generic/ConfirmModal";
import { Table } from "../../../../components/common/Generic/Table/Table";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { useFetchUsersTable } from "../../../../hooks/fetchItems/table/useFetchUsersTable";
import { useUserTable } from "../../../../hooks/tables/useUserTable";
import { useMemo, useState } from "react";
import type { UserPaginatedQueryPayload } from "../../../../@types/user/user.payload";
import { useUserFilters } from "../../../../hooks/filters/admin/useUserFilters";
import { SearchInputBar } from "../../../../components/common/Generic/SearchInputBar";
import { useUpdateUrlParam } from "../../../../hooks/updateUrlParam/useUpdateUrlParam";
import { UserFilterSideBar } from "./UserFilterSideBar";



export function UserDataTable() {
  const { filters } = useUserFilters();
  const { updateURLParam } = useUpdateUrlParam();
  const [name, setName] = useState(filters.name ?? "");

  const query: UserPaginatedQueryPayload = useMemo(() => ({
    limit: 5, random: false,
    name: filters.name, cpf: filters.cpf, email: filters.email, role: filters.role,
  }), [filters.name, filters.cpf, filters.email, filters.role]);

  const { users, isLoading, refetch, internalPage, setInternalPage, totalRows } = useFetchUsersTable(query);
  const { UserColumns, confirmDeleteId, setConfirmDeleteId, handleDelete } = useUserTable(refetch);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <UserFilterSideBar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
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
          columns={UserColumns}
          data={users || []}
          isLoading={isLoading}
          subHeader
          subHeaderComponent={
            <div className="flex max-md:flex-col items-center justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 p-2 w-full">
                <h3 className="text-left max-md:text-center">Pesquisar por nome:</h3>
                <div className="flex max-md:flex-col items-center gap-4 w-full">
                  <SearchInputBar
                    classNameDiv="w-full"
                    id="user-name-search"
                    placeholder="Pesquisar nome..."
                    name="user-name"
                    value={name}
                    onChange={setName}
                    onSearch={(value) => updateURLParam("name", value)}
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
              <Button id="user-add-btn" as="link" href="/admin/users/create" variant="cta" className="flex items-center gap-2 px-4 py-2 rounded-md">
                  <PlusIcon size={32} weight="thin" /> Cadastrar usuário
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
