import { GameDataTable } from "./sections/GameDataTable";

export function GameDashboardPage(){

  return(
      <main className="pt-10 min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base">
          <header className="mb-10 justify-self-center w-fit bg-white/5 text-white rounded-xl p-4 border border-white/8 backdrop-blur-sm">
              <h1 className="text-2xl text-center ">Tabela de Jogos</h1>
          </header>

          <div className="container justify-self-center p-4">
            <GameDataTable />
          </div>
      </main>
  )
}
