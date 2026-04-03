import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, Clock } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load data from local storage
    const loadedOrders = JSON.parse(localStorage.getItem('at_orders') || '[]');
    const loadedUsers = JSON.parse(localStorage.getItem('at_users') || '[]');
    setOrders(loadedOrders);
    setUsers(loadedUsers);
  }, []);

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
    setOrders(updatedOrders);
    localStorage.setItem('at_orders', JSON.stringify(updatedOrders));
  };

  const handlePaymentChange = (orderId, newPaymentStatus) => {
    const updatedOrders = orders.map(o => o.orderId === orderId ? { ...o, paymentStatus: newPaymentStatus } : o);
    setOrders(updatedOrders);
    localStorage.setItem('at_orders', JSON.stringify(updatedOrders));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Received': return 'status-received';
      case 'Confirmed': return 'status-confirmed';
      case 'Payment Confirmed': return 'status-payment';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  const pendingOrders = orders.filter(o => o.status !== 'Completed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'Completed' ? o.total : 0), 0);

  return (
    <div className="admin-dashboard container">
      <h1 className="mb-8">Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{users.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value">{orders.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Orders</div>
          <div className="stat-value text-gold">{pendingOrders}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Completed Revenue</div>
          <div className="stat-value text-green">₹{totalRevenue.toFixed(2)}</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="orders-section">
          <h2 className="section-title">Manage Orders</h2>
          <div className="orders-list">
            {orders.length === 0 ? (
              <p className="text-gray">No orders have been placed yet.</p>
            ) : (
              orders.map(order => (
                <div key={order.orderId} className={`order-card ${getStatusBadgeClass(order.status)}`}>
                  <div className="order-header">
                    <div>
                      <span className="order-id">{order.orderId}</span>
                      <span className="order-date">{new Date(order.date).toLocaleString()}</span>
                    </div>
                    <div className={`order-status-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status === 'Completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                      {order.status}
                    </div>
                  </div>
                  
                  <div className="order-customer">
                    <strong>Customer:</strong> {order.customerName} ({order.customerId})
                    {order.verifiedPhone && <span className="verified-tag">Verified</span>}
                  </div>
                  
                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <span>{item.qty} x [{item.itemCode || '?'}] {item.name}</span>
                        <span>₹{(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="order-footer">
                    <div className="order-total">
                      Total: ₹{order.total.toFixed(2)}
                      <span className={`payment-badge ${order.paymentStatus?.toLowerCase().replace(' ', '-')}`}>
                        {order.paymentStatus || 'Pending'}
                      </span>
                    </div>
                    
                    <div className="order-actions">
                      {order.status === 'Received' && (
                        <button 
                          className="btn-primary"
                          onClick={() => handleStatusChange(order.orderId, 'Confirmed')}
                        >
                          Confirm Order
                        </button>
                      )}
                      
                      {order.status === 'Confirmed' && order.paymentStatus !== 'Payment Confirmed' && (
                        <button 
                          className="btn-primary payment-btn"
                          onClick={() => {
                            handleStatusChange(order.orderId, 'Payment Confirmed');
                            handlePaymentChange(order.orderId, 'Paid');
                          }}
                        >
                          Confirm Payment
                        </button>
                      )}
                      
                      {order.status === 'Payment Confirmed' && (
                        <button 
                          className="btn-primary complete-btn"
                          onClick={() => handleStatusChange(order.orderId, 'Completed')}
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="users-section">
          <h2 className="section-title">Registered Users</h2>
          <div className="users-list">
            {users.length === 0 ? (
              <p className="text-gray">No users registered.</p>
            ) : (
              users.map(u => (
                <div key={u.id} className="user-card">
                  <div className="user-name">{u.name}</div>
                  <div className="user-phone">{u.phone}</div>
                  <div className="user-address">{u.address}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
