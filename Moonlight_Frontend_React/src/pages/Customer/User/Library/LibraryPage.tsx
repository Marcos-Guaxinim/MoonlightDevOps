// import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../../components/common/Generic/Spinner";
import { useCart } from "../../../../hooks/cart/useCart";
import { useFetchLibrary } from "../../../../hooks/fetchItems/store/useFetchLibrary";
import { GameCard } from "../../../../components/common/Generic/GameCard/GameCard";
import { Card, CardContent, CardHeader } from "../../../../components/common/Generic/Card";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { LibraryContext } from "../../../../hooks/library/useLibrary";
import { useContext } from "react";



function LibraryPage() {
    const {games: libraryGames, isLoading} = useFetchLibrary();
    const {addItemToCart, removeItemFromCart, items} = useCart();
    const { isOwned } = useContext(LibraryContext);


    if (isLoading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!libraryGames || libraryGames.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex items-center justify-center">
                <Card variant="primary" className="p-8">
                    <CardHeader className="mb-8">
                        <h1 className="text-center text-3xl text-white">
                            Você ainda não adquiriu jogos na loja
                        </h1>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button as="link" href="/" variant="cta" className="p-4 flex gap-2 items-center rounded-md">
                            <ShoppingCartIcon size={28}/> Ver jogos
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }


  return (
    <main className="h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex flex-col items-center justify-center">
        <header className="mb-10 w-fit bg-white/5 text-white rounded-xl p-4 border border-white/8 backdrop-blur-sm">
            <h1 className="text-2xl text-center px-10">Meus Jogos</h1>
        </header>

        <div className="container justify-self-center w-full animate-fade-in bg-white/5 text-white rounded-xl p-4 border border-white/8 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {libraryGames?.map(game => {
                    const alreadyInCart = items.some(cartItem => cartItem.id_game === game.id_game);
                    const cartItem = { id_game: game.id_game!, title: game.title, price: game.price, image: game.image, categories: game.categories}

                    return(
                        <GameCard
                            game={game}
                            onCart={() => alreadyInCart
                                ? removeItemFromCart(game.id_game!)
                                : addItemToCart(cartItem)
                            }
                            onBuy={() => addItemToCart(cartItem, "cart")}
                            gamePage={`/games/${game.id_game}`}
                            isAlreadyInCart={alreadyInCart}
                            key={game.id_game}
                            isOwned={isOwned(game.id_game)}
                        />
                    )
                })}
            </div>
        </div>
    </main>
  )
}


export default LibraryPage;
