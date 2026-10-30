import { Button } from "../../../components/common/Generic/Button/Button";
import { Card, CardContent, CardHeader } from "../../../components/common/Generic/Card";

export function CheckoutFailurePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex flex-col items-center justify-center">
            <Card variant="primary" className="p-8 animate-fade-in">
                <CardHeader><h1 className="text-3xl font-bold text-white">❌ Pagamento Recusado.</h1></CardHeader>
                <CardContent>
                    <p className="text-slate-400">
                        Seu pagamento foi recusado pela operadora. Por favor, tente com outra forma de pagamento ou entre em contato com seu banco.
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
