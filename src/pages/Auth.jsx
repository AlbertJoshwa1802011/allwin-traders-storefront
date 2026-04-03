import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', password: '' });
  const [error, setError] = useState('');
  
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Admin backdoor
    if (formData.phone === 'admin' && formData.password === 'admin123') {
      login({ name: 'Administrator', phone: 'admin', isAdmin: true });
      navigate('/admin');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('at_users') || '[]');

    if (isLogin) {
      // Login
      const user = existingUsers.find(u => u.phone === formData.phone && u.password === formData.password);
      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Invalid phone number or password.');
      }
    } else {
      // Sign Up
      if (existingUsers.find(u => u.phone === formData.phone)) {
        setError('An account with this phone number already exists.');
        return;
      }
      
      const newUser = {
        id: `U-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        isAdmin: false
      };
      
      localStorage.setItem('at_users', JSON.stringify([...existingUsers, newUser]));
      login(newUser);
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="text-center">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
        <p className="text-center text-gray mb-8">
          {isLogin ? 'Login to view your orders and fast checkout.' : 'Sign up to streamline your future purchases.'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </div>
          )}
          
          <div className="form-group">
            <label>Phone Number (Admin: 'admin')</label>
            <input type="text" name="phone" required value={formData.phone} onChange={handleChange} />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea name="address" required value={formData.address} onChange={handleChange} rows="3"></textarea>
            </div>
          )}
          
          <div className="form-group">
            <label>Password (Admin: 'admin123')</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-primary w-100">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="text-gold fw-600" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
