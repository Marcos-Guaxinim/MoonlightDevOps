import { useContext } from "react";
import type { GameResponseDTO } from "../../../../@types/game/game.dto";
import { useCart } from "../../../../hooks/cart/useCart";
import { LibraryContext } from "../../../../hooks/library/useLibrary";
import { GameCard } from "../GameCard/GameCard";
import { Button } from "../Button/Button";

type GameListProps = {
  games: GameResponseDTO[]
}

export function GameList(props: GameListProps) {

  const { addItemToCart, removeItemFromCart, items } = useCart();
  const { isOwned } = useContext(LibraryContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {props.games?.map((game) => {
        const alreadyInCart = items.some(
          (cartItem) => cartItem.id_game === game.id_game,
        );
        const cartItem = {
          id_game: game.id_game!,
          title: game.title,
          price: game.price,
          image: game.image,
          categories: game.categories,
        };

        return (
          <GameCard
            game={game}
            onCart={() =>
              alreadyInCart
                ? removeItemFromCart(game.id_game!)
                : addItemToCart(cartItem)
            }
            onBuy={() => addItemToCart(cartItem, "cart")}
            gamePage={`/games/${game.id_game}`}
            isAlreadyInCart={alreadyInCart}
            key={game.id_game}
            isOwned={isOwned(game.id_game!)}
            actions={
              isOwned(game.id_game!) ? (
                <Button
                  variant="cta"
                  className="rounded-md p-2 w-full animate-glow-cta"
                  onClick={() => window.open(game.link)}
                >
                  Baixar
                </Button>
              ) : undefined
            }
          />
        );
      })}

      {props.games.length == 0 &&
          <h3>Nenhum jogo encontrado.</h3>
      }
    </div>
  )

}
