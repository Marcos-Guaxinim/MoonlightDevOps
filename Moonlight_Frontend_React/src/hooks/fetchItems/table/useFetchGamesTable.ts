import toast from "react-hot-toast";
import { fetchGamesPaginatedAdmin } from "../../../services/realServices/game.service";
import { useEffect, useState } from "react";
import type { GamePaginatedQueryPayload } from "../../../@types/game/game.payload";
import type { GameResponseDTO } from "../../../@types/game/game.dto";

export function useFetchGamesTable(query: GamePaginatedQueryPayload){
    const [games, setGames] = useState<GameResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [internalPage, setInternalPage] = useState(1);
    const [version, setVersion] = useState(0);

    const {active, limit, category, launch_date_from, launch_date_to, price_max, price_min, random, title} = query

    useEffect(() => {
        setGames([]);
        setInternalPage(1);
    }, [active, category, title, price_min, price_max, launch_date_from, launch_date_to, random]);

    useEffect(() => {
        let isMounted = true;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsLoading(true)

        const queryPayload: GamePaginatedQueryPayload = {
            ...query,
            page: internalPage,
        };

        fetchGamesPaginatedAdmin(queryPayload)
        .then((response) => {
          if (isMounted) {

            if (internalPage > response.totalPages) {
              setInternalPage(internalPage - 1);
              return;
            }

            setGames(response.data);
            setTotalRows(response.total);
          }
        }).catch(() =>
            toast.error("Não foi possivel carregar os Jogos.")
        ).finally(() => {
           if(isMounted) setIsLoading(false)
        });
        return () => { isMounted = false; };
    }, [active, limit, internalPage, category, launch_date_from, launch_date_to, price_max, price_min, random, title, version]);

    const refetch = () => setVersion(v => v + 1);

    return { games, isLoading, totalRows, internalPage, setInternalPage, refetch }
}
