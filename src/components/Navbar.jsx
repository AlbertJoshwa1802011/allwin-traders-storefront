import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount, user, logout } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <span className="logo-text text-gold">Allwin</span>
          <span className="logo-text text-green"> Traders</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link to="/" className="nav-link">Home</Link>
          <a href="/#products" className="nav-link">Products</a>
          <Link to="/about" className="nav-link">About Us</Link>
        </div>

        {/* Actions (Cart & User) */}
        <div className="nav-actions">
          {user?.isAdmin && (
            <Link to="/admin" className="nav-link desktop-only text-primary fw-500">Dashboard</Link>
          )}
          
          <Link to="/cart" className="action-btn cart-btn">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          <div className="user-menu desktop-only">
            {user ? (
              <div className="user-dropdown-container">
                <button className="action-btn user-btn">
                  <User size={24} />
                  <span className="user-name">{user.name.split(' ')[0]}</span>
                </button>
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="dropdown-item">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary login-btn">Login</Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Open State */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <a href="/#products" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Products</a>
          <Link to="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          
          <div className="mobile-divider"></div>
          
          {user ? (
            <>
              {user.isAdmin && (
                <Link to="/admin" className="mobile-link text-green" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
              )}
              <div className="mobile-user-greeting">Hi, {user.name}</div>
              <button onClick={handleLogout} className="mobile-link text-danger">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary mobile-login-btn" onClick={() => setIsMenuOpen(false)}>Login / Sign Up</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
