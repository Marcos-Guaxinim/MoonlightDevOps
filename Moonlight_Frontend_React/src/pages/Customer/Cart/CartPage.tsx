import { CartItemsQuantity } from "./sections/CartItemsQuantity";
import { useCart } from "../../../hooks/cart/useCart";
import { CartData } from "./sections/CartData";
import { useAuth } from "../../../hooks/auth/useAuth";


function CartPage() {
  const {items, removeItemFromCart, clearUpCart, totalPrice} = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex flex-col items-center justify-center">
        <div className="p-10 relative w-full flex flex-col gap-10 max-lg:max-w-md lg:max-w-xl animate-fade-in">
          <CartItemsQuantity quantity={items.length}/>
          {items.length > 0 &&
            <CartData
              isAuthenticated={isAuthenticated}
              items={items}
              onRemove={removeItemFromCart}
              onClear={clearUpCart}
              totalPrice={totalPrice}
            />
          }
        </div>
    </main>
  )
}


export default CartPage;
