import { Button } from "../../../components/common/Generic/Button/Button";
import { Card, CardContent, CardHeader } from "../../../components/common/Generic/Card";

export function CheckoutPendingPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex flex-col items-center justify-center">
            <Card variant="primary" className="p-8 animate-fade-in">
                <CardHeader><h1 className="text-3xl font-bold text-white">⏳ Pagamento em Análise.</h1></CardHeader>
                <CardContent>
                    <p className="text-slate-400">
                        Sua compra foi registrada, mas o pagamento (geralmente via Boleto ou Pix) ainda está sendo processado. Atualizaremos o status em 'Pedidos' assim que for confirmado.
                    </p>
                    <div className="flex max-lg:flex-col justify-self-center gap-4">
                        <Button as="link" href="/orders" variant="cta" className="p-2">
                            Ver Meus Pedidos
                        </Button>
                        <Button as="link" href="/" variant="primary" className="p-2">
                            Continuar Comprando
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </main>
    );
}
