import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Card, CardHeader } from "../../../components/common/Generic/Card";
import { Button } from "../../../components/common/Generic/Button/Button";
import { useLocation, useParams } from "react-router-dom";
import { GameForm } from "./sections/GameForm";
import type { GameResponseDTO } from "../../../@types/game/game.dto";
import { useFetchGame } from "../../../hooks/fetchItems/fetchOne/useFetchGame";


export function GameEditPage() {
    const { id_game } = useParams();
    const { state } = useLocation();

    function handleGame() : GameResponseDTO | undefined {
      const gameFromState: GameResponseDTO | null = state != null ? state.game : null;

      const { game: gameFromApi } = useFetchGame(Number(id_game), {
        enabled: state == null
      });

      return gameFromState ?? gameFromApi;
    }

    const game = handleGame();
    if(!game) return;

    return(
        <main className="py-10 min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base">
            <Card variant="primary" className="flex flex-col mb-10 gap-10 border py-8 container justify-self-center">
                <CardHeader className="flex items-center gap-4">
                    <Button as="link" href="/admin/games" icon={<ArrowLeftIcon size={32} weight="thin" />} className="bg-white/10 p-2 text-white rounded-xl hover:bg-white/20"/>
                    <h1 className="text-2xl">Editar Jogo:</h1>
                </CardHeader>
                <hr />
                <GameForm mode="edit" game={game}/>
            </Card>
        </main>
    )
}
