import { useCart } from "../../../hooks/cart/useCart";
import { Card, CardContent, CardHeader } from "../../../components/common/Generic/Card";
import { Button } from "../../../components/common/Generic/Button/Button";
import { useEffect } from "react";

// CheckoutSuccessPage.tsx
export function CheckoutSuccessPage() {

    const {clearUpCart} = useCart();

    useEffect(() => {
        clearUpCart()
    }, [])


    return (
        <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex flex-col items-center justify-center">
            <Card variant="primary" className="p-8 animate-fade-in">
                <CardHeader><h1 className="text-center text-3xl font-bold text-white">🥳 Compra Aprovada!</h1></CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p className="text-center text-slate-400">Seus jogos já estão disponíveis na sua biblioteca.</p>
                    <div className="flex max-lg:flex-col justify-between gap-4">
                        <Button as="link" href="/orders" variant="cta" className="p-2 rounded-md animate-glow-cta">
                            Ver Meus Pedidos
                        </Button>
                        <Button as="link" href="/" variant="primary" className="p-2 rounded-md">
                            Continuar Comprando
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
