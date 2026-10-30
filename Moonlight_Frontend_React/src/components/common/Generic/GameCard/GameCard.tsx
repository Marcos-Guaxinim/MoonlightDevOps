import { formatCurrency } from "../../../../utils/currencyFormatter/formatCurrency";
import { Button } from "../Button/Button";
import { Card, CardContent} from "../Card";
import type { GameCardProps } from "./GameCard.types";
import { RenderDefaultActions } from "./GameCard.actions";
import { resolveImageUrl } from "../../../../utils/resolveImage/resolveImageUrl";

export function GameCard(props : GameCardProps) {
  const {game, gamePage, actions, isOwned} = props;

  return (
      <Card className="hover:scale-105 hover:border-white/30 transition-all duration-300 cursor-pointer">
          <Button as="link" href={gamePage} className="block">
            <img src={`${resolveImageUrl(game.image)}`} className="h-64 w-full object-contain rounded-md" />
              <CardContent className="mt-1">
                <h3>{game.title}</h3>
                <div className="h-6">
                  {!isOwned ? (
                    <p className="text-sm text-gray-400">
                      {game.price == 0 ? "Grátis" : formatCurrency(game.price)}
                    </p>
                  ) : (
                    <p className="text-sm text-blue-400 font-medium">Na Biblioteca</p>
                  )}
                </div>
              </CardContent>
          </Button>
          <div className="flex max-lg:flex-col gap-2 mt-2 items-center text-center">
            {
              actions ?? <RenderDefaultActions {...props} />}
          </div>
      </Card>
  );
}
