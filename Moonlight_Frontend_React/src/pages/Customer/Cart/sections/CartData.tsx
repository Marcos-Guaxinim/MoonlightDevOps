import { TrashIcon } from "@phosphor-icons/react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { formatCurrency } from "../../../../utils/currencyFormatter/formatCurrency";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../../../@types/common/cartItem";
import { resolveImageUrl } from "../../../../utils/resolveImage/resolveImageUrl";

// CartData.tsx
type CartDataProps = {
    items: CartItem[];
    onRemove: (id_game: number) => void;
    onClear: () => void;
    totalPrice: number;
    isAuthenticated: boolean;

}

export function CartData({ items, onRemove, onClear, totalPrice, isAuthenticated }: CartDataProps) {

    const navigate = useNavigate();

    function handleCheckout() {
        if (!isAuthenticated) {
            toast.error("Faça login para finalizar a compra.");
            navigate("/login");
            return;
        }
    }

  return (
    <div className="flex flex-col gap-4">
      {items.map(item => (
        <div key={item.id_game} className="flex gap-4 items-center bg-white/5 border border-white/10 rounded-xl p-4">
          <img src={`${resolveImageUrl(item.image)}`} alt={item.title} className="w-24 h-16 object-cover rounded-lg shrink-0" />
          <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{item.title}</p>
              <p className="text-slate-400 text-sm line-clamp-1">{item.categories?.join(", ")}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-white font-medium">
              {item.price === 0 ? "Grátis" : `${formatCurrency(item.price)}`}
            </p>
            <Button variant="danger" className="block rounded-md p-2 w-fit" onClick={() => onRemove(item.id_game)}>
              <TrashIcon size={18} />
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2">
        <Button variant="danger" className="block rounded-md p-2 w-fit" onClick={onClear}>
          Limpar carrinho
        </Button>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-slate-400">Total</p>
            <p className="text-xl text-white font-medium">{totalPrice == 0 ? 'Gratuito' : `${formatCurrency(totalPrice)}`}</p>
          </div>
          {isAuthenticated
              ? <Button as="link" href="/checkout" variant="cta" className="px-6 py-2 rounded-md">
                  Finalizar compra
                </Button>
              : <Button as="button" onClick={handleCheckout} variant="cta" className="px-6 py-2 rounded-md">
                  Finalizar compra
                </Button>
          }
        </div>
      </div>
    </div>
  );
}
