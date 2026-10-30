import type { OrderResponseDTO } from "../../../../../@types/order/order.dto";
import { formatCurrency } from "../../../../../utils/currencyFormatter/formatCurrency";
import { resolveImageUrl } from "../../../../../utils/resolveImage/resolveImageUrl";

export const ExpandedOrderItems = ({ order }: { order: OrderResponseDTO }) => (
    <div className="p-4 border-l-2 border-primary">
        <h4 className="text-white/70 text-sm mb-2 uppercase tracking-tighter">Itens do Pedido</h4>
        <table className="w-full text-white text-sm">
            <thead>
                <tr className="border-b border-white/10 text-left">
                    <th className="py-2">Título</th>
                    <th className="py-2">Imagem</th>
                    <th className="py-2 text-right">Preço</th>
                </tr>
            </thead>
            <tbody>
                {order.games?.map((item, index) => (
                    <tr key={index} className="border-b border-white/5">
                        <td className="py-2">{item.title}</td>
                        <td className="py-2"><img src={`${resolveImageUrl(item.image)}`} className="h-45" /></td>
                        <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
