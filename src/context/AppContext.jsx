import { createContext, useContext, useState, useEffect } from 'react';
import { storefrontService } from '../lib/storefrontService';

const AppContext = createContext();

// NOTE: In a real production setup, this would be your actual Firebase UID from the POS app.
// For now, we use a placeholder or an env variable.
const STORE_OWNER_UID = import.meta.env.VITE_STOREFRONT_OWNER_UID || 'allwin_traders_main';

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [verifiedPhone, setVerifiedPhone] = useState(null);

  // Sync Products from Firestore
  useEffect(() => {
    setLoading(true);
    const unsubscribe = storefrontService.subscribeToProducts(STORE_OWNER_UID, (items) => {
      setProducts(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('at_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedCart = localStorage.getItem('at_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('at_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setVerifiedPhone(null);
    localStorage.removeItem('at_user');
  };

  const addToCart = (product, qty) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map(item => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      } else {
        newCart = [...prev, { ...product, qty }];
      }
      localStorage.setItem('at_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== id);
      localStorage.setItem('at_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateCartQty = (id, qty) => {
    setCart(prev => {
      const newCart = prev.map(item => item.id === id ? { ...item, qty } : item);
      localStorage.setItem('at_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('at_cart');
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.length;

  return (
    <AppContext.Provider value={{ 
      products, loading, categories,
      cart, addToCart, removeFromCart, updateCartQty, clearCart, cartTotal, cartCount,
      user, login, logout,
      verifiedPhone, setVerifiedPhone
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
