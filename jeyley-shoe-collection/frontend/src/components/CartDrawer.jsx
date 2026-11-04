
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/context';

function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Background overlay */}
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-black/50 w-full h-full"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart panel */}
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">

        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Your Shopping Bag</h2>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close shopping bag"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={45} className="mx-auto mb-4" />
              <h3 className="font-bold text-lg">Your bag is empty</h3>
              <p className="text-gray-500 mt-2">
                Discover something you love.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 border-b pb-5"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover bg-gray-100"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      No image
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.size} | Colour: {item.color}
                    </p>

                    <p className="font-semibold mt-2">
                      KSh {item.price.toLocaleString('en-KE')}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border">
                        <button
                          className="p-2"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(
                              item.variantId,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus size={15} />
                        </button>

                        <span className="px-3 text-sm">
                          {item.quantity}
                        </span>

                        <button
                          className="p-2"
                          aria-label="Increase quantity"
                          disabled={item.quantity >= item.stock}
                          onClick={() =>
                            updateQuantity(
                              item.variantId,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.variantId)}
                        className="text-red-600"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t p-6">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Subtotal</span>
            <span>
              KSh {cartTotal.toLocaleString('en-KE')}
            </span>
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Delivery charges will be calculated at checkout.
          </p>

          <button
            disabled={cartItems.length === 0}
            onClick={() => {
              setIsCartOpen(false);
              alert('Checkout will be connected in a later step.');
            }}
            className="w-full bg-black text-white py-4 font-semibold disabled:bg-gray-400"
          >
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CartDrawer;
