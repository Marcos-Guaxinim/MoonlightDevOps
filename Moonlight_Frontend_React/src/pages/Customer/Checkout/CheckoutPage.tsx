// CheckoutPage.tsx
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCheckout } from '../../../hooks/checkout/useCheckout';
import { Card, CardContent, CardHeader } from '../../../components/common/Generic/Card';
import { Spinner } from '../../../components/common/Generic/Spinner';
import { Navigate} from 'react-router-dom';

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

export function CheckoutPage() {
    const {preferenceId, isLoading} = useCheckout();

    if (isLoading) {
        return (
            <div className="w-full h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!isLoading && !preferenceId) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex flex-col items-center justify-center">
            {/* Equivalente ao <script data-preference-id> do PHP */}
            {preferenceId && (
                <Card variant="primary" className="p-8 animate-fade-in">
                    <CardHeader><h1 className="text-center text-3xl font-bold text-white">Checkout</h1></CardHeader>
                    <CardContent>
                        <Wallet
                            initialization={{ preferenceId }}
                        />
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
