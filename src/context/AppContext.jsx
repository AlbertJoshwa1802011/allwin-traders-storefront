import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Try to load cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('at_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Try to load user from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('at_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('at_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('at_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('at_user');
    }
  }, [user]);

  const addToCart = (product, qty) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const updateCartQty = (id, newQty) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const cartCount = cart.length; // Distinct item count

  return (
    <AppContext.Provider value={{
      cart, addToCart, updateCartQty, removeFromCart, clearCart, cartTotal, cartCount,
      user, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
