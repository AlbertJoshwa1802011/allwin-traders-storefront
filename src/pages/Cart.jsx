import { useAppContext } from '../context/AppContext';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppOrderBtn from '../components/WhatsAppOrderBtn';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateCartQty, cartTotal } = useAppContext();

  // Format kg nicely for loose items
  const formatQtyDisplay = (isLoose, q, unit) => {
    if (isLoose && q < 1) return `${q * 1000}g`;
    return `${q} ${unit}`;
  };

  const handleQtyChange = (item, newQty) => {
    if (newQty < item.minQty) return;
    updateCartQty(item.id, Number(newQty.toFixed(3)));
  };

  if (cart.length === 0) {
    return (
      <div className="container cart-page empty-cart">
        <ShoppingCart size={64} className="text-gray mb-4" />
        <h2>Your Cart is Empty</h2>
        <p className="text-gray mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1 className="mb-8">Your Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-header grid grid-cols-4 desktop-only">
            <span className="col-span-2">Product</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          
          {cart.map(item => (
            <div key={item.id} className="cart-row">
              <div className="cart-item-info">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div>
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">₹{item.price} / {item.unit}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
              
              <div className="cart-item-qty">
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => handleQtyChange(item, item.qty - item.step)} disabled={item.qty <= item.minQty}>-</button>
                  <span className="qty-display">{formatQtyDisplay(item.type === 'Loose', item.qty, item.unit)}</span>
                  <button className="qty-btn" onClick={() => handleQtyChange(item, item.qty + item.step)}>+</button>
                </div>
              </div>
              
              <div className="cart-item-subtotal">
                ₹{(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>Calculated later</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="confirmation-msg">
            <p>Please call or message us on WhatsApp to confirm your order details and delivery.</p>
          </div>
          
          <WhatsAppOrderBtn />
          <Link to="/" className="btn-outline w-100 mt-4 text-center" style={{width: '100%'}}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
