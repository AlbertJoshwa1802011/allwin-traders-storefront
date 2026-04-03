import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, getProductsByCategory } from '../data/products';
import './Home.css';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getProductsByCategory();

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.itemCode && p.itemCode.toString() === searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Experience the Purity of Traditional Oils & Groceries</h1>
            <p className="hero-subtitle">Premium wood-pressed oils, homemade pickles, and quality spices directly from Coimbatore.</p>
            <a href="#products" className="btn-primary hero-btn">Shop Now</a>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Discovery Section */}
      <section id="products" className="discovery-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Premium Selection</h2>
            <div className="separator"></div>
          </div>
          
          <div className="filters-container">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className="category-pills">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`pill-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-4 product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state text-center mt-4">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Us Preview Section */}
      <section className="about-preview-section">
        <div className="container">
          <div className="about-preview-grid">
            <div className="about-preview-image">
              <img 
                src="/assets/images/preview.png" 
                alt="Allwin Traders Storefront" 
              />
              <div className="since-badge-floating">Since 2000</div>
            </div>
            <div className="about-preview-content">
              <h2 className="section-title-left">About Allwin Traders</h2>
              <p className="mb-4">Founded in the year 2000, Allwin Traders has been a trusted name in quality oils and traditional grocery products in Pn Palayam, Coimbatore.</p>
              <p className="mb-8">"தரம் தான் எங்கள் முதல் முன்னுரிமை" - Quality is our first priority. We ensure 100% quality in all our products, preserving natural nutrients and purity.</p>
              <Link to="/about" className="btn-outline">Read Our Story</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
