import { ShoppingCartIcon } from "@phosphor-icons/react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { Collapse } from "../../../../components/common/Generic/Collapse";
import { useCart } from "../../../../hooks/cart/useCart";
import { useFetchGame } from "../../../../hooks/fetchItems/fetchOne/useFetchGame";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../../components/common/Generic/Spinner";
import { formatCurrency } from "../../../../utils/currencyFormatter/formatCurrency";
import { useContext } from "react";
import { LibraryContext } from "../../../../hooks/library/useLibrary";
import { resolveImageUrl } from "../../../../utils/resolveImage/resolveImageUrl";

type GameDetailProps = {
    id_game: number;
}

export function GameDetail({id_game} : GameDetailProps){
    const navigate = useNavigate();
    const {game, isLoading} = useFetchGame(id_game);
    const {addItemToCart, removeItemFromCart, items} = useCart();
    const alreadyInCart = items.some(cartItem => cartItem.id_game === id_game);
    const { isOwned } = useContext(LibraryContext);

    if (isLoading) {
        return (
            <div className="w-full h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex items-center justify-center">
                <Spinner />
            </div>
        );
    }
    if(!game){
        navigate("/");
        return null;
    }

    const cartItem = { id_game: game.id_game!, title: game.title, price: game.price, image: game.image, categories: game.categories}

    return(
        <article className="w-full flex flex-col gap-14 relative overflow-hidden">
            <header className="lg:text-left lg:p-2 lg:pl-20 max-lg:text-center">
                <h1 className="pb-4 relative font-display text-5xl font-black uppercase leading-tight tracking-tight text-foreground justify-baseline fx-underline-to-left">{game.title}</h1>
            </header>
            <div className="flex max-lg:pt-4 max-lg:flex-col max-lg:w-full max-lg:flex-wrap lg:flex-row lg:flex-nowrap lg:p-2 lg:pl-20 lg:pb-4 lg:gap-18">
                <section className="lg:w-2/3">
                    <img
                        className="w-full object-contain h-full min-h-[400px] rounded-xl max-lg:justify-self-center max-lg:w-[90vw]"
                        src={`${resolveImageUrl(game.banner_image)}`}
                        alt={game.title}
                    />
                </section>
                <section className="flex flex-col justify-center flex-wrap max-lg:text-center max-lg:items-center max-lg:p-12 lg:items-start lg:w-1/3 lg:text-left lg:p-0">
                    {!isOwned(id_game) &&
                        <p className="flex flex-col gap-1 max-lg:text-2xl lg:text-4xl mb-4">
                            {game.price == 0 ? "Grátis" : formatCurrency(game.price)}
                        </p>
                    }
                    {isOwned(game.id_game!) ? (
                        <Button
                            variant="cta"
                            className="block rounded-md p-4 w-fit animate-glow-cta mb-2"
                            onClick={() => window.open(game.link)}
                        >
                            Baixar Jogo
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="cta"
                                className="block rounded-md p-2 w-fit animate-glow-cta mb-2"
                                onClick={() => addItemToCart(cartItem, "cart")}
                            >
                                {game.price == 0 ? "Adicionar à Biblioteca" : "Comprar Agora"}
                            </Button>

                            <Button
                                variant={alreadyInCart ? "danger" : "primary"}
                                className="flex gap-2 content-center text-center items-center border-0 rounded-md p-2 mb-2"
                                onClick={() => alreadyInCart
                                    ? removeItemFromCart(game.id_game!)
                                    : addItemToCart(cartItem)
                                }
                            >
                                <ShoppingCartIcon size={18}/>
                                {alreadyInCart ? "Remover do carrinho" : "Adicionar ao Carrinho"}
                            </Button>
                        </>
                    )}
                    <p className="text-white">{game.categories!.join(", ")}</p>
                </section>
            </div>
            <Collapse label="Ver descrição do jogo aqui">
                <div className="container text-left">
                    <p>{game.description}</p>
                </div>
                <h2 className="container text-2xl">Categorias:</h2>
                <div className="container text-left">
                    <p>{game.categories!.join(", ")}</p>
                </div>
            </Collapse>
        </article>
    )
}
