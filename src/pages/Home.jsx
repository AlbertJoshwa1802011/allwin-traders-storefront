import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';
import './Home.css';

const Home = () => {
  const { products, categories, loading, storeConfig, featuredProducts } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // Sort: in-stock first, then featured, then by name
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      // Out of stock goes to bottom
      if (a.inStock && !b.inStock) return -1;
      if (!a.inStock && b.inStock) return 1;
      // Featured goes to top
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [filteredProducts]);

  return (
    <div className="home-page">
      {/* Hero Section - Dynamic from POS Web config */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              {storeConfig.heroTitle || 'Allwin Traders: Premium Traditional Oils in Coimbatore'}
            </h1>
            <p className="hero-subtitle">
              {storeConfig.heroSubtitle || 'Authentic Irumbu Chekku (wood-pressed) oils, homemade spices, and quality groceries delivered from Pn Palayam.'}
            </p>
            <a href="#products" className="btn-primary hero-btn">Explore Our Products</a>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Featured Products Section - only shown when featured items exist */}
      {featuredProducts.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Featured Products</h2>
              <div className="separator"></div>
            </div>
            <div className="grid grid-cols-4 product-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

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

          {loading ? (
            <div className="text-center py-20">
              <div className="loading-spinner"></div>
              <p className="mt-4 text-slate-500">Loading fresh products...</p>
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-4 product-grid">
              {sortedProducts.map(product => (
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
                alt={`${storeConfig.storeName || 'Allwin Traders'} Storefront`}
              />
              <div className="since-badge-floating">Since 2000</div>
            </div>
            <div className="about-preview-content">
              <h2 className="section-title-left">About {storeConfig.storeName || 'Allwin Traders'}</h2>
              <p className="mb-4">Founded in the year 2000, {storeConfig.storeName || 'Allwin Traders'} has been a trusted name in quality oils and traditional grocery products in Pn Palayam, Coimbatore.</p>
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
