import { useState } from "react";
import type { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Generic/Button/Button";
import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { deleteCategory } from "../../services/realServices/category.service";
import type { CategoryResponseDTO } from "../../@types/category/category.dto";
import { resolveImageUrl } from "../../utils/resolveImage/resolveImageUrl";
import { createColumnHelper } from "@tanstack/react-table";
import type { appTableFeatures } from "../../utils/tableFeatures";

const columnHelper = createColumnHelper<typeof appTableFeatures, CategoryResponseDTO>();

export function useCategoryTable(refetch: () => void){
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleEdit = (row: CategoryResponseDTO) => {
        navigate(`/admin/categories/edit/${row.id_category}`, { state: {category: row} });
    }
    const handleDelete = async (id_category: number) => {
        try{
            await deleteCategory(id_category);
            setConfirmDeleteId(null)
            refetch();
        } catch(err){
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            toast.error(message);
        }
    }

    const CategoryColumns = columnHelper.columns([
      columnHelper.accessor("name", { header: "Nome" }),
      columnHelper.accessor("description", { header: "Descrição" }),
      columnHelper.accessor("image", {
        header: "Imagem",
        cell: (info) => <img className="h-auto w-30" src={resolveImageUrl(`${info.getValue()}`)}/>
      }),
      columnHelper.display({
        id: "actions",
        header: "Ações",
        cell: (info) => (
          <>
            <Button id={`cat-edit-btn-${info.row.index}`} variant="transparent" onClick={() => handleEdit(info.row.original)}>
              <PencilIcon size={32} />
            </Button>
            <Button id={`cat-delete-btn-${info.row.index}`} variant="transparent" onClick={() => setConfirmDeleteId(info.row.original.id_category!)}>
              <TrashIcon size={32} />
            </Button>
          </>
        ),
      }),
    ])

    return {CategoryColumns, confirmDeleteId, setConfirmDeleteId, handleDelete};
}
