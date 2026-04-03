import { ShieldCheck, Droplet, Award, MapPin } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page animate-fade-in">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">About Allwin Traders</h1>
          <div className="tagline-box">
            <h3 className="tagline-en">"Quality is our first priority"</h3>
            <h4 className="tagline-ta">"தரம் தான் எங்கள் முதல் முன்னுரிமை"</h4>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="about-content-section container">
        <div className="about-grid">
          <div className="about-text-content">
            <div className="badge-since-container">
              <span className="since-badge">EST. 2000</span>
            </div>
            <p className="lead-text">
              Founded in the year 2000, <strong>Allwin Traders</strong> has been a trusted name in quality oils and traditional grocery products in Pn Palayam, Coimbatore.
            </p>
            <p>
              We ensure <strong>100% quality</strong> in all our products. While our prices may be slightly higher, we never compromise on quality.
            </p>
            <p>
              Our oils are prepared using traditional <strong>Irumbu Chekku (cold-pressed)</strong> methods, preserving natural nutrients and purity.
            </p>
            <p>
              We proudly serve customers from Periyanaicken Palayam and also from Kerala and Karnataka. Our mission is to provide healthy and high-quality products consistently.
            </p>
          </div>
          <div className="about-image-content">
            <img 
              src="/assets/images/about_process.png" 
              alt="Traditional Oil Extraction Process" 
              className="about-image"
            />
            <div className="image-accent-box"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="text-center mb-8">Why Choose Us?</h2>
          <div className="features-grid">
            
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck size={32} /></div>
              <h3>100% Quality Assurance</h3>
              <p>We ensure zero compromises on the purity and standard of our goods.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Droplet size={32} /></div>
              <h3>Traditional Chekku Oils</h3>
              <p>Extracted using Irumbu Chekku methods to preserve essential nutrients.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Award size={32} /></div>
              <h3>Trusted Since 2000</h3>
              <p>Over two decades of proven community trust and excellence.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><MapPin size={32} /></div>
              <h3>Serving Multiple Regions</h3>
              <p>Proudly serving Coimbatore, as well as customers in Kerala and Karnataka.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
