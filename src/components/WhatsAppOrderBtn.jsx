import { useAppContext } from '../context/AppContext';

const WhatsAppOrderBtn = () => {
  const { cart, cartTotal, user, clearCart } = useAppContext();
  
  const handleWhatsAppOrder = () => {
    // Generate Order ID
    const orderId = `AW-${Math.floor(Date.now() / 1000).toString().slice(-6)}`;
    
    // Save order locally
    const newOrder = {
      orderId,
      customerId: user ? user.phone : 'Guest',
      customerName: user ? user.name : 'Guest',
      items: cart,
      total: cartTotal,
      status: 'Pending',
      date: new Date().toISOString()
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('at_orders') || '[]');
    localStorage.setItem('at_orders', JSON.stringify([newOrder, ...existingOrders]));
    
    // Format message
    let message = `Order Request - Allwin Traders\n\n`;
    message += `Order ID: ${orderId}\n`;
    message += `User: ${user ? user.name : 'Guest'}\n`;
    if(user && user.address) message += `Address: ${user.address}\n`;
    message += `\n*Items:*\n`;
    
    cart.forEach((item, index) => {
      const displayQty = item.type === 'Loose' && item.qty < 1 ? `${item.qty * 1000}g` : `${item.qty} ${item.unit}`;
      message += `${index + 1}. [Code: ${item.itemCode || 'N/A'}] ${item.name} - ${displayQty} - ₹${(item.price * item.qty).toFixed(2)}\n`;
    });
    
    message += `\n*Total: ₹${cartTotal.toFixed(2)}*\n\n`;
    message += `Please confirm my order.`;
    
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '917598810559'; // Phone number provided
    
    // Clear cart after placing request
    clearCart();
    
    // Open WA
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <button className="btn-primary" style={{width: '100%'}} onClick={handleWhatsAppOrder}>
      Order via WhatsApp
    </button>
  );
};

export default WhatsAppOrderBtn;
