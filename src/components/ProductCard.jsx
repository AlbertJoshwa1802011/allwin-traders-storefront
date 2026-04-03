import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();
  const [qty, setQty] = useState(product.minQty);

  const isLoose = product.type === 'Loose';
  const isOutOfStock = !product.inStock;

  const handleIncrease = () => setQty(prev => prev + product.step);
  const handleDecrease = () => {
    if (qty > product.minQty) {
      setQty(prev => prev - product.step);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, Number(qty.toFixed(3)));
  };

  // Format kg nicely for loose items
  const formatQtyDisplay = (q) => {
    if (isLoose && q < 1) return `${q * 1000}g`;
    return `${q} ${product.unit}`;
  };

  return (
    <div className={`product-card animate-fade-in ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        {product.featured && <span className="badge featured-badge">Featured</span>}
        {isOutOfStock && (
          <div className="out-of-stock-overlay">
            <span className="out-of-stock-badge">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="product-details">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-price-row">
          <span className="product-price">{'\u20B9'}{product.price} <span className="price-unit">/ {product.unit}</span></span>
        </div>

        {isOutOfStock ? (
          <div className="product-actions">
            <button className="btn-primary add-to-cart-btn out-of-stock-btn" disabled>
              Currently Unavailable
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ProductCard;
