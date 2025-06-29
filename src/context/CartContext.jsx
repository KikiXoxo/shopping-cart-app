import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = plant => {
    setCart(prev => {
      const existing = prev.find(item => item.id === plant.id);
      if (existing) {
        return prev.map(item =>
          item.id === plant.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 20) }
            : item
        );
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
    toast.success(`Plant added to cart successfully!`);
  };

  const removeFromCart = id => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.info('Plant removed from cart successfully!');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1 || quantity > 20) return;
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
