import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/currencyFormatter/formatCurrency";
import { Button } from "../../components/common/Generic/Button/Button";
import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { deleteGame } from "../../services/realServices/game.service";
import type { GameResponseDTO } from "../../@types/game/game.dto";
import { resolveImageUrl } from "../../utils/resolveImage/resolveImageUrl";
import { createColumnHelper } from "@tanstack/react-table";
import type { appTableFeatures } from "../../utils/tableFeatures";

const columnHelper = createColumnHelper<typeof appTableFeatures, GameResponseDTO>();

export function useGameTable(refetch: () => void){
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleEdit = (row: GameResponseDTO) => {
        navigate(`/admin/games/edit/${row.id_game}`, { state: {game: row} });
    }
    const handleDelete = async (id_game: number) => {
        try{
            await deleteGame(id_game);
            setConfirmDeleteId(null)
            refetch();
        } catch(err){
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            toast.error(message);
        }
    }

    const GameColumns = columnHelper.columns([
      columnHelper.accessor("title", { header: "Título" }),
      columnHelper.accessor("price", {
        header: "Preço",
        cell: (info) => formatCurrency(info.getValue()),
      }),
      columnHelper.accessor("image", {
        header: "Imagem",
        cell: (info) => <img className="h-auto w-30" src={resolveImageUrl(`${info.getValue()}`)}/>
      }),
      columnHelper.accessor("active", {
        header: "Ativo",
        cell: (info) => (info.getValue() ? "Sim" : "Não"),
      }),
      columnHelper.display({
        id: "actions",
        header: "Ações",
        cell: ({ row }) => (
          <>
            <Button variant="transparent" onClick={() => handleEdit(row.original)}>
              <PencilIcon size={32} />
            </Button>
            <Button variant="transparent" onClick={() => setConfirmDeleteId(row.original.id_game!)}>
                <TrashIcon size={32} />
            </Button>
          </>
        )
      })
    ])

    return {GameColumns, confirmDeleteId, setConfirmDeleteId, handleDelete};
}
