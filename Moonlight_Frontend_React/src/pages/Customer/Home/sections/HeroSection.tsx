import type { GameResponseDTO } from "../../../../@types/game/game.dto";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { resolveImageUrl } from "../../../../utils/resolveImage/resolveImageUrl";

type HeroSectionProps = {
    game: GameResponseDTO
}

export function HeroSection({game} : HeroSectionProps){
    return(
            <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
                <img
                    src={`${resolveImageUrl(game.banner_image)}`}
                    alt={game.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="gradient-overlay absolute inset-0" />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 flex h-full items-end pb-20 animate-fade-in">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl animate-slide-up">
                            <span className="mb-3 inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1 font-body text-xs font-semibold uppercase tracking-widest text-primary">
                                Jogos Populares
                            </span>
                            <h1 className="mb-4 font-display text-5xl font-black uppercase leading-tight tracking-tight text-foreground md:text-7xl">
                               {game.title}
                            </h1>
                            <p className="mb-8 max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
                                {game.description}
                            </p>
                            <div className="flex flex-wrap">
                                <Button variant="cta" as="link" href={`/games/${game.id_game}`} className="p-4 rounded-md flex">
                                     Visitar a página do jogo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
};
