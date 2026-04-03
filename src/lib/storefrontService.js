import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export const storefrontService = {
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
          image: data.image || '/assets/images/placeholder.png', // Fallback
          unit: data.unit || 'pcs',
          minQty: data.minQty || 1,
          step: data.step || 1,
          type: data.type || 'Packaged',
          featured: !!data.featured,
        };
      });
      callback(products);
    }, (error) => {
      console.error("Error fetching products:", error);
      callback([]);
    });
  }
};
