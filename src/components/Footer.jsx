import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Shop Info */}
          <div className="footer-col">
            <img src="/assets/images/logo.jpg" alt="Allwin Traders" className="footer-logo-img" />
            <p className="footer-tagline">"தரம் தான் எங்கள் முதல் முன்னுரிமை"</p>
            <p className="footer-desc">Trusted name in quality oils and traditional grocery products since 2000 in Coimbatore.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><a href="/#products">Products</a></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={20} className="footer-icon" />
                <span>Pn Palayam, Coimbatore, Tamil Nadu 641020</span>
              </li>
              <li>
                <Phone size={20} className="footer-icon" />
                <a href="tel:+917598810559">7598810559</a>
              </li>
              <li>
                <Mail size={20} className="footer-icon" />
                <a href="mailto:info@allwintraders.com">info@allwintraders.com</a>
              </li>
            </ul>
          </div>

          {/* Location / Action */}
          <div className="footer-col">
            <h4 className="footer-heading">Visit Our Shop</h4>
            <a 
              href="https://maps.app.goo.gl/6AHRzsfBpwd47kG86" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-map-btn"
            >
              <div className="map-placeholder">
                <MapPin size={24} />
                <span>View on Google Maps</span>
              </div>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Allwin Traders. All Rights Reserved.</p>
          <div className="social-links">
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Facebook size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
