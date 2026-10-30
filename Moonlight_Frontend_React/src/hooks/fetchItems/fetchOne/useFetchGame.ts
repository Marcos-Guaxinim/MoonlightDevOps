import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchGameById } from "../../../services/realServices/game.service";
import type { GameResponseDTO } from "../../../@types/game/game.dto";

type UseFetchGameOptions = {
  enabled?: boolean;
};

export function useFetchGame(id_game: number, options: UseFetchGameOptions = {}){
    const { enabled = true } = options;
    const [game, setGame] = useState<GameResponseDTO>();
    const [isLoading, setIsLoading] = useState(enabled);

    useEffect(() => {
        if (!enabled) return;

        fetchGameById(id_game)
        .then(response => {
            setGame(response);
        }).catch(() =>
            toast.error("Não foi possivel encontrar o jogo ou ele não existe.")
        ).finally(() =>
            setIsLoading(false)
        );
    }, [id_game]);

    return { game, isLoading }
}
