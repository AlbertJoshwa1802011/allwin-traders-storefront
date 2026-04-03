import { createContext, useContext, useState, useEffect } from 'react';
import { storefrontService } from '../lib/storefrontService';

const AppContext = createContext();

const STORE_OWNER_UID = import.meta.env.VITE_STOREFRONT_OWNER_UID || 'allwin_traders_main';

// Default store config (used as fallback until Firestore config loads)
const DEFAULT_STORE_CONFIG = {
  storeName: 'Allwin Traders',
  heroTitle: 'Premium Traditional Oils & Groceries',
  heroSubtitle: 'Authentic Irumbu Chekku oils, homemade spices, and quality groceries from Coimbatore.',
  categories: ['Oils', 'Ghee', 'Traditional Items', 'Pickles', 'Dry Fruits', 'Others'],
  whatsappNumber: '917598810559',
};

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [verifiedPhone, setVerifiedPhone] = useState(null);

  // Store config from Firestore (set by POS Web admin)
  const [storeConfig, setStoreConfig] = useState(DEFAULT_STORE_CONFIG);
  const [configLoading, setConfigLoading] = useState(true);

  // Sync Products from Firestore (real-time)
  useEffect(() => {
    setLoading(true);
    const unsubscribe = storefrontService.subscribeToProducts(STORE_OWNER_UID, (items) => {
      setProducts(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync Store Config from Firestore (real-time)
  useEffect(() => {
    setConfigLoading(true);
    const unsubscribe = storefrontService.subscribeToStoreConfig(STORE_OWNER_UID, (config) => {
      if (config) {
        setStoreConfig(prev => ({
          ...prev,
          ...config,
          // Ensure categories always has values
          categories: config.categories?.length ? config.categories : DEFAULT_STORE_CONFIG.categories,
        }));
      }
      setConfigLoading(false);
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
    // Don't allow adding out-of-stock items
    if (!product.inStock) return;

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

  // Dynamic categories from store config (real-time from POS Web)
  const categories = ['All', ...storeConfig.categories];

  // Separate featured products
  const featuredProducts = products.filter(p => p.featured && p.inStock);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.length;

  return (
    <AppContext.Provider value={{
      products, loading, categories,
      cart, addToCart, removeFromCart, updateCartQty, clearCart, cartTotal, cartCount,
      user, login, logout,
      verifiedPhone, setVerifiedPhone,
      // New: store config and featured products (real-time from POS Web)
      storeConfig, configLoading,
      featuredProducts,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
