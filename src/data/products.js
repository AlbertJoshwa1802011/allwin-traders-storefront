// Base image placeholders for various categories
const COCONUT_IMG = 'https://images.unsplash.com/photo-1628190009698-1e434cd133bd?auto=format&fit=crop&q=80&w=800&h=600';
const SESAME_IMG = 'https://images.unsplash.com/photo-1605809709230-daac4c682071?auto=format&fit=crop&q=80&w=800&h=600';
const GROUNDNUT_IMG = 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800&h=600';
const GHEE_IMG = 'https://images.unsplash.com/photo-1629864223190-6715f02bc574?auto=format&fit=crop&q=80&w=800&h=600';
const PICKLE_IMG = 'https://images.unsplash.com/photo-1582531633515-54ca2ec7cd07?auto=format&fit=crop&q=80&w=800&h=600';
const DRYFRUIT_IMG = 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=800&h=600';
const VADAGAM_IMG = 'https://images.unsplash.com/photo-1549495066-edc93de821ed?auto=format&fit=crop&q=80&w=800&h=600';

// Improved high-quality images
const SUNFLOWER_IMG = '/assets/images/sunflower_oil.png';
const CASTOR_IMG = '/assets/images/castor_oil.png';
const NEEM_IMG = '/assets/images/neem_oil.png';
const MURUKKU_IMG = '/assets/images/murukku.png';
const RICE_BRAN_IMG = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800&h=600';
const APPALAM_IMG = 'https://images.unsplash.com/photo-1626132646540-3fb7aa2ff61a?auto=format&fit=crop&q=80&w=800&h=600'; // Crunchy snacks look

// Factory for Loose Oils (Items 1-6)
const looseOils = [
  { itemCode: '1', name: 'Loose Coconut Oil', image: COCONUT_IMG },
  { itemCode: '2', name: 'Loose Groundnut Oil', image: GROUNDNUT_IMG },
  { itemCode: '3', name: 'Loose Sunflower Oil', image: SUNFLOWER_IMG },
  { itemCode: '4', name: 'Loose Refined Groundnut Oil', image: GROUNDNUT_IMG },
  { itemCode: '5', name: 'Loose Nallennai (Sesame Oil)', image: SESAME_IMG },
  { itemCode: '6', name: 'Loose Castor Oil', image: CASTOR_IMG },
].map(item => ({
  ...item,
  id: `loc-oil-${item.itemCode}`,
  category: 'Oils',
  type: 'Loose',
  unit: 'kg',
  price: 250, // mock base price
  minQty: 0.250,
  step: 0.250,
  description: `Premium cold-pressed ${item.name.toLowerCase()} for daily household use. Sold by weight.`
}));

// Factory for Packaged Pouch Oils (Items 7-15)
const packagedOils = [
  { itemCode: '7', name: '5 Ltr Sunflower Oil Can', image: SUNFLOWER_IMG },
  { itemCode: '8', name: 'Sunflower Pouch 1 Ltr', image: SUNFLOWER_IMG },
  { itemCode: '9', name: 'Fortune Sunflower Oil 1 Ltr', image: SUNFLOWER_IMG },
  { itemCode: '10', name: 'Mantra Groundnut Oil 1 Ltr', image: GROUNDNUT_IMG },
  { itemCode: '11', name: 'Gems Gold Groundnut Oil 1 Ltr', image: GROUNDNUT_IMG },
  { itemCode: '12', name: 'Ganapathy Oil 1 Ltr', image: GROUNDNUT_IMG },
  { itemCode: '13', name: 'Raha Rice Bran Oil 1 Ltr', image: RICE_BRAN_IMG },
  { itemCode: '14', name: 'PRK Nallennai 1 Ltr', image: SESAME_IMG },
  { itemCode: '15', name: 'ABC Coconut Oil 1 Ltr', image: COCONUT_IMG },
].map(item => ({
  ...item,
  id: `pkg-oil-${item.itemCode}`,
  category: 'Oils',
  type: 'Packaged',
  unit: 'pack',
  price: item.name.includes('5 Ltr') ? 750 : 180,
  minQty: 1,
  step: 1,
  description: `Sealed branded packaged ${item.name.toLowerCase()}.`
}));

// Factory for Traditional & Pooja Oils (Items 16-20)
const poojaOils = [
  { itemCode: '16', name: 'Neem Oil (Various Sizes)', image: NEEM_IMG },
  { itemCode: '17', name: 'Iluppai Ennai (Various Sizes)', image: NEEM_IMG },
  { itemCode: '18', name: 'Castor Oil Bottles', image: CASTOR_IMG },
  { itemCode: '19', name: 'Pungai Ennai', image: NEEM_IMG },
  { itemCode: '20', name: 'Kadugu Ennai', image: GROUNDNUT_IMG },
].map(item => ({
  ...item,
  id: `poo-oil-${item.itemCode}`,
  category: 'Traditional Items',
  type: 'Packaged',
  unit: 'bottle',
  price: 90,
  minQty: 1,
  step: 1,
  description: `Authentic traditional ${item.name.toLowerCase()} suitable for pooja and traditional remedies.`
}));

// Ghee (Items 21-22)
const ghees = [
  { itemCode: '21', name: 'Aroma Ghee (All Sizes)' },
  { itemCode: '22', name: 'Iyyappa Ghee (All Sizes)' },
].map(item => ({
  ...item,
  id: `ghee-${item.itemCode}`,
  image: GHEE_IMG,
  category: 'Ghee',
  type: 'Packaged',
  unit: 'jar',
  price: 450,
  minQty: 1,
  step: 1,
  description: `Pure and aromatic traditional ${item.name.toLowerCase()}.`
}));

// Pickles (Items 23-24)
const pickles = [
  { itemCode: '23', name: 'Guru Pickles (All Variants)' },
  { itemCode: '24', name: 'Senthur Pickles' },
].map(item => ({
  ...item,
  id: `pickle-${item.itemCode}`,
  image: PICKLE_IMG,
  category: 'Pickles',
  type: 'Packaged',
  unit: 'pack',
  price: 150,
  minQty: 1,
  step: 1,
  description: `Tangy and spicy homemade-style ${item.name.toLowerCase()}.`
}));

// Snacks & Traditional Items (Items 25-27)
const snacks = [
  { itemCode: '25', name: 'Appalam Items', image: APPALAM_IMG },
  { itemCode: '26', name: 'Vadagam Items', image: VADAGAM_IMG },
  { itemCode: '27', name: 'Murukku', image: MURUKKU_IMG },
].map(item => ({
  ...item,
  id: `snk-${item.itemCode}`,
  category: 'Traditional Items',
  type: 'Packaged',
  unit: 'pack',
  price: 60,
  minQty: 1,
  step: 1,
  description: `Crispy and authentic traditional ${item.name.toLowerCase()}.`
}));

// Dry Fruits (Item 28)
const dryFruits = [
  { itemCode: '28', name: 'Dry Fruits (Dates, Cashews, etc)' }
].map(item => ({
  ...item,
  id: `dry-${item.itemCode}`,
  image: DRYFRUIT_IMG,
  category: 'Dry Fruits',
  type: 'Loose',
  unit: 'kg',
  price: 850,
  minQty: 0.100,
  step: 0.050,
  description: `Premium assortment of dry fruits and nuts sold loose by weight.`
}));

// Others (Item 29)
const others = [
  { itemCode: '29', name: 'Other Items (Groundnut Cake, Copparai, Dalda)' }
].map(item => ({
  ...item,
  id: `oth-${item.itemCode}`,
  image: GROUNDNUT_IMG,
  category: 'Others',
  type: 'Packaged',
  unit: 'pack',
  price: 120,
  minQty: 1,
  step: 1,
  description: `Miscellaneous traditional grocery items.`
}));

// Combine them all
export const products = [
  ...looseOils,
  ...packagedOils,
  ...poojaOils,
  ...ghees,
  ...pickles,
  ...snacks,
  ...dryFruits,
  ...others
];

export const getProductsByCategory = () => {
    const categories = ['All', ...new Set(products.map(p => p.category))];
    return categories;
};
