import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "../../components/common/Generic/Button/Button";
import { useState } from "react";
import { deleteUser } from "../../services/realServices/user.service";
import { useNavigate } from "react-router-dom";
import { formatCPF } from "../../utils/Validation/dataRules/User/userCpf";
import toast from "react-hot-toast";
import type { UserResponseDTO } from "../../@types/user/user.dto";
import { createColumnHelper } from "@tanstack/react-table";
import type { appTableFeatures } from "../../utils/tableFeatures";

const columnHelper = createColumnHelper<typeof appTableFeatures, UserResponseDTO>();

export function useUserTable(refetch: () => void){
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleEdit = (row: UserResponseDTO) => {
        navigate(`/admin/users/edit/${row.id_user}`, { state: {user: row} });
    }
    const handleDelete = async (id_user: number) => {
        try{
            await deleteUser(id_user);
            setConfirmDeleteId(null)
            refetch();
        } catch(err){
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            toast.error(message);
        }
    }

    const UserColumns = columnHelper.columns([
      columnHelper.accessor("name", { header: "Nome" }),
      columnHelper.accessor("email", { header: "E-Mail" }),
      columnHelper.accessor("cpf", {
        header: "Cpf",
        cell: (info) => formatCPF(info.getValue())
      }),
      columnHelper.accessor("roles", {
        header: "Cargos",
        cell: (info) => info.getValue().join(", ")
      }),
      columnHelper.display({
        id: "actions",
        header: "Ações",
        cell: (info) => (
          <>
            <Button id={`user-edit-btn-${info.row.index}`} variant="transparent" onClick={() => handleEdit(info.row.original)}>
              <PencilIcon size={32} />
            </Button>
            <Button id={`user-delete-btn-${info.row.index}`} variant="transparent" onClick={() => setConfirmDeleteId(info.row.original.id_user!)}>
              <TrashIcon size={32} />
            </Button>
          </>
        ),
      }),
    ])

    return {UserColumns, confirmDeleteId, setConfirmDeleteId, handleDelete};
}
