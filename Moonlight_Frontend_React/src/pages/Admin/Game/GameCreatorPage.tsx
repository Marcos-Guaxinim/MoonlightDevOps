import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Card, CardHeader } from "../../../components/common/Generic/Card";
import { Button } from "../../../components/common/Generic/Button/Button";
import { GameForm } from "./sections/GameForm";

export function GameCreatorPage() {
    return(
        <main className="py-10 min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base">
            <Card variant="primary" className="flex flex-col gap-10 border py-8 container justify-self-center">
                <CardHeader className="flex items-center gap-4">
                    <Button as="link" href="/admin/games" icon={<ArrowLeftIcon size={32} weight="thin" />} className="bg-white/10 p-2 text-white rounded-xl hover:bg-white/20"/>
                    <h1 className="text-2xl">Criar Jogo:</h1>
                </CardHeader>
                <hr />
                <GameForm mode="create"/>
            </Card>
        </main>

    )
}
