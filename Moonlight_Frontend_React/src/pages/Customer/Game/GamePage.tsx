import { useParams } from "react-router-dom";
import { GameDetail } from "./sections/GameDetail";


function GamePage() {
  const { id } = useParams();
  const id_game = Number(id);

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex flex-col items-center justify-center">
      <GameDetail id_game={id_game}/>
    </main>
  )
}

// ideia colocar uma sessão de carrousel de game card em baixo, para mostrar mais jogos que os usuarios gostam.


export default GamePage;
