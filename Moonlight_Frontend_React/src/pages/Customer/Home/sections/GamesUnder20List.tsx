import { useMemo } from "react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { useFetchPaginatedGames } from "../../../../hooks/fetchItems/store/useFetchPaginatedGames";
import { getRandomSeed } from "../../../../utils/getRandomSeed";
import type { GamePaginatedQueryPayload } from "../../../../@types/game/game.payload";
import { Spinner } from "../../../../components/common/Generic/Spinner";
import { GameList } from "../../../../components/common/Generic/GameList/GameList";

export function GamesUnder20List(){
    const query: GamePaginatedQueryPayload = useMemo(() => ({
        page: 1,
        limit: 8,
        random: true,
        random_seed: getRandomSeed(),
        title: undefined,
        category: undefined,
        launch_date_from: undefined,
        launch_date_to: undefined,
        price_min: 0.01,
        price_max: 20
    }), [])

    const {games, hasMore, loadMore, isLoading} = useFetchPaginatedGames(query);
    let conteudo;
    if (isLoading) {
      conteudo = <Spinner />;
    } else if (games.length === 0) {
      conteudo = <p>Nenhum jogo encontrado.</p>
    } else {
      conteudo = <GameList games={games}/>
    }

    return(
        <section className="pt-8 w-full bg-base-soft">
            <div className="container justify-self-center w-full animate-fade-in p-6">
                <div className="mb-5">
                    <h1 className="text-2xl">Jogos abaixo de 20 reais:</h1>
                </div>
                {conteudo}
                <div className="p-8 w-full">
                    {hasMore
                    ? (
                        <Button variant="cta" className="p-4 rounded-md flex justify-self-center" onClick={() => loadMore()}>
                            Ver mais
                        </Button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </section>
    )
}
