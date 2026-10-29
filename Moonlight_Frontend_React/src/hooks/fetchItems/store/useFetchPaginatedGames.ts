import { useEffect, useState } from "react";
import { fetchGamesPaginated } from "../../../services/realServices/game.service";
import toast from "react-hot-toast";
import type { GamePaginatedQueryPayload } from "../../../@types/game/game.payload";
import type { GameResponseDTO } from "../../../@types/game/game.dto";

export function useFetchPaginatedGames(query: GamePaginatedQueryPayload){
    const [games, setGames] = useState<GameResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [internalPage, setInternalPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const {limit, category, launch_date_from, launch_date_to, price_max, price_min, random, title} = query

    useEffect(() => {
        setGames([]);
        setInternalPage(1);
        setHasMore(true);
    }, [category, title, price_min, price_max, launch_date_from, launch_date_to, random]);

    useEffect(() => {
        let isMounted = true;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsLoading(true)

        fetchGamesPaginated({limit, page: internalPage, category, launch_date_from, launch_date_to, price_max, price_min, random, title})
        .then(response => {
            if (isMounted) {
                setGames(prev => internalPage === 1 ? response.data : [...prev, ...response.data]);
                setHasMore(internalPage < response.totalPages);
            }
        }).catch(() =>
            toast.error("Não foi possivel carregar os jogos.")
        ).finally(() => {
            if(isMounted) setIsLoading(false);
        });

        return () => { isMounted = false; };

    }, [limit, internalPage, category, launch_date_from, launch_date_to, price_max, price_min, random, title]);

    const loadMore = () => setInternalPage(internalPage => internalPage + 1);

    return { games, isLoading, loadMore, hasMore }
}
