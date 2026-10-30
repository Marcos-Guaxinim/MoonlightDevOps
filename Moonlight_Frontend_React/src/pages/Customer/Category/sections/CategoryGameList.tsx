import { useMemo } from "react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { useFetchPaginatedGames } from "../../../../hooks/fetchItems/store/useFetchPaginatedGames";
import { getRandomSeed } from "../../../../utils/getRandomSeed";
import type { GamePaginatedQueryPayload } from "../../../../@types/game/game.payload";
import { Spinner } from "../../../../components/common/Generic/Spinner";
import { GameList } from "../../../../components/common/Generic/GameList/GameList";

type CategoryGamesListProps = {
  title?: string;
  category?: string;
  launch_date_from?: string;
  launch_date_to?: string;
  price_min?: number;
  price_max?: number;
};

export function CategoryGamesList(props: CategoryGamesListProps) {
  const query: GamePaginatedQueryPayload = useMemo(
    () => ({
      page: 1,
      limit: 8,
      random: false,
      random_seed: getRandomSeed(),
      title: props.title,
      category: props.category,
      launch_date_from: props.launch_date_from,
      launch_date_to: props.launch_date_to,
      price_min: props.price_min,
      price_max: props.price_max,
    }),
    [props],
  );

  const { games, hasMore, loadMore, isLoading } = useFetchPaginatedGames(query);
  let conteudo;
  if (isLoading) {
    conteudo = <Spinner />;
  } else if (games.length === 0) {
    conteudo = <p>Nenhum jogo encontrado.</p>
  } else {
    conteudo = <GameList games={games}/>
  }

  return (
    <section className="px-4 pt-8 w-full">
      <div className="container justify-self-center w-full animate-fade-in">
        <div className="mb-5">
          <h1 className="text-2xl">Resultado com base na categoria:</h1>
        </div>
        {conteudo}
        <div className="p-8 w-full">
          {hasMore ? (
            <Button
              variant="secondary"
              className="p-4 rounded-md flex justify-self-center"
              onClick={() => loadMore()}
            >
              Ver mais
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}
