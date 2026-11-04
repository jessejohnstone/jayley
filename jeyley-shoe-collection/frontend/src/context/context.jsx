
import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('jeyley-cart')) || [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem('jeyley-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a selected shoe variant
  const addToCart = (product, variant) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.variantId === variant.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.variantId === variant.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  Number(variant.stock_quantity)
                )
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          variantId: variant.id,
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.images?.[0] || '',
          size: variant.size,
          color: variant.color,
          stock: Number(variant.stock_quantity),
          quantity: 1
        }
      ];
    });
  };

  // Update item quantity
  const updateQuantity = (variantId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.variantId === variantId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(Number(quantity), item.stock)
              )
            }
          : item
      )
    );
  };

  // Remove item
  const removeFromCart = (variantId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.variantId !== variantId
      )
    );
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
