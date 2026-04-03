import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();
  const [qty, setQty] = useState(product.minQty);
  
  const isLoose = product.type === 'Loose';
  
  const handleIncrease = () => setQty(prev => prev + product.step);
  const handleDecrease = () => {
    if (qty > product.minQty) {
      setQty(prev => prev - product.step);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, Number(qty.toFixed(3)));
  };
  
  // Format kg nicely for loose items
  const formatQtyDisplay = (q) => {
    if (isLoose && q < 1) return `${q * 1000}g`;
    return `${q} ${product.unit}`;
  };

  return (
    <div className="product-card animate-fade-in">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        {product.featured && <span className="badge featured-badge">Featured</span>}
      </div>
      
      <div className="product-details">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        
        <div className="product-price-row">
          <span className="product-price">₹{product.price} <span className="price-unit">/ {product.unit}</span></span>
        </div>
        
        <div className="product-actions">
          <div className="qty-controls">
            <button className="qty-btn" onClick={handleDecrease} disabled={qty <= product.minQty}>-</button>
            <span className="qty-display">{formatQtyDisplay(qty)}</span>
            <button className="qty-btn" onClick={handleIncrease}>+</button>
          </div>
          
          <button className="btn-primary add-to-cart-btn" onClick={handleAddToCart}>
            <ShoppingCart size={18} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
