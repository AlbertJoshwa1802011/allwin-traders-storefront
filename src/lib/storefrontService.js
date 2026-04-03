import { collection, doc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export const storefrontService = {
  /**
   * Subscribe to products that are marked as visible in storefront.
   * Real-time: any change from POS Web or Mobile POS reflects instantly.
   */
  subscribeToProducts(ownerUid, callback) {
    if (!ownerUid || !db) {
      callback([]);
      return () => {};
    }

    const itemsCol = collection(db, 'users', ownerUid, 'items');
    const q = query(
      itemsCol,
      where('showInStorefront', '==', true),
      orderBy('itemName', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const products = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.itemName,
          price: data.sellingPrice,
          category: data.category || 'Others',
          description: data.description || '',
          image: data.image || '/assets/images/placeholder.png',
          unit: data.unit || 'pcs',
          minQty: data.minQty || 1,
          step: data.step || 1,
          type: data.type || 'Packaged',
          featured: !!data.featured,
          // Stock awareness - new fields for real-time sync
          stockQuantity: data.stockQuantity ?? null,
          lowStockThreshold: data.lowStockThreshold || 5,
          inStock: (data.stockQuantity ?? 1) > 0,
        };
      });
      callback(products);
    }, (error) => {
      console.error("Error fetching products:", error);
      callback([]);
    });
  },

  /**
   * Subscribe to store configuration (hero, categories, WhatsApp, etc.)
   * Set from POS Web admin panel, syncs in real-time to storefront.
   */
  subscribeToStoreConfig(ownerUid, callback) {
    if (!ownerUid || !db) {
      callback(null);
      return () => {};
    }

    const configRef = doc(db, 'users', ownerUid, 'config', 'storefront');

    return onSnapshot(configRef, (snap) => {
      if (snap.exists()) {
        callback(snap.data());
      } else {
        callback(null);
      }
    }, (error) => {
      console.error("Error fetching store config:", error);
      callback(null);
    });
  }
};
