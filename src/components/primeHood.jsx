import React, { useState } from 'react'
import { ShoppingCart, Heart, Menu, X, Search, Star } from 'lucide-react'

const PrimeHood = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [favorites, setFavorites] = useState(new Set())

  const products = [
    { id: 1, name: 'Classic Black Hood', price: 49.99, rating: 4.8, color: 'Black', bgColor: '#1e293b' },
    { id: 2, name: 'Urban Grey', price: 54.99, rating: 4.9, color: 'Grey', bgColor: '#475569' },
    { id: 3, name: 'Navy Blue Premium', price: 59.99, rating: 5, color: 'Navy', bgColor: '#001f3f' },
    { id: 4, name: 'Charcoal Comfort', price: 52.99, rating: 4.7, color: 'Charcoal', bgColor: '#374151' },
    { id: 5, name: 'Forest Green', price: 54.99, rating: 4.6, color: 'Green', bgColor: '#15803d' },
    { id: 6, name: 'Burgundy Elite', price: 59.99, rating: 4.8, color: 'Burgundy', bgColor: '#5f0f40' },
    { id: 7, name: 'Ocean Blue', price: 54.99, rating: 4.7, color: 'Ocean Blue', bgColor: '#0369a1' },
    { id: 8, name: 'Sunset Orange', price: 59.99, rating: 4.9, color: 'Orange', bgColor: '#ea580c' },
    { id: 9, name: 'Midnight Purple', price: 64.99, rating: 5, color: 'Purple', bgColor: '#6b21a8' },
  ]

  const addToCart = () => setCartCount(cartCount + 1)

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const filteredProducts = selectedFilter === 'all'
    ? products
    : products.filter(p => p.price <= parseFloat(selectedFilter))

  return (
    <div className="app-container">
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-content">
          <div className="header-top">
            <div className="logo">
              <h1>PRIME HOOD</h1>
            </div>

            <nav className="desktop-nav">
              <a href="#home">Shop</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#blog">Blog</a>
            </nav>

            <div className="header-icons">
              <button className="icon-btn" title="Search">
                <Search size={20} />
              </button>
              <button className="icon-btn" title="Favorites">
                <Heart size={20} />
              </button>
              <button className="icon-btn cart-btn" title="Shopping Cart">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </button>
              <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                title="Menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="mobile-nav">
              <a href="#home" onClick={() => setMenuOpen(false)}>Shop</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
              <a href="#blog" onClick={() => setMenuOpen(false)}>Blog</a>
            </nav>
          )}
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-title">
              Elevate Your <span className="gradient-text">Style</span>
            </h2>
            <p className="hero-desc">
              Experience premium comfort with our curated collection of hoodies. Designed for those who demand quality and style.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Shop Now</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">👕</div>
          </div>
        </div>
      </section>

      {/* ===== FILTER SECTION ===== */}
      <section className="filter-section">
        <div className="filter-content">
          <h3>Filter by Price</h3>
          <div className="filter-buttons">
            {['all', '50', '55', '60', '65'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
              >
                {filter === 'all' ? 'All' : `Up to $${filter}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section className="products-section">
        <div className="products-container">
          <h2 className="section-title">Featured Collection</h2>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image" style={{ backgroundColor: product.bgColor }}>
                  <button
                    className="wishlist-btn"
                    onClick={() => toggleFavorite(product.id)}
                    title="Add to favorites"
                  >
                    <Heart
                      size={20}
                      fill={favorites.has(product.id) ? 'currentColor' : 'none'}
                      color={favorites.has(product.id) ? '#ec4899' : 'white'}
                    />
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="star-icon" />
                      ))}
                    </div>
                    <span className="rating-text">({product.rating})</span>
                  </div>
                  <p className="product-color">Color: {product.color}</p>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button
                      onClick={addToCart}
                      className="btn-add-cart"
                    >
                      <ShoppingCart size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-grid">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: '↩️', title: '30-Day Returns', desc: 'Hassle-free returns' },
              { icon: '🔒', title: 'Secure Payment', desc: 'SSL encrypted checkout' },
              { icon: '💬', title: '24/7 Support', desc: 'Always here to help' },
            ].map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <h2 className="section-title">Stay Updated</h2>
          <p className="newsletter-desc">Subscribe to get the latest releases and exclusive deals</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Prime Hood</h4>
              <p>Premium hoodies for premium people. Quality, comfort, and style in every stitch.</p>
            </div>
            <div className="footer-col">
              <h4>Shop</h4>
              <ul>
                <li><a href="#all">All Hoodies</a></li>
                <li><a href="#mens">Men's Collection</a></li>
                <li><a href="#womens">Women's Collection</a></li>
                <li><a href="#sale">Sale Items</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#track">Track Order</a></li>
                <li><a href="#shipping">Shipping Info</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
                <li><a href="#disclaimer">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Prime Hood. All rights reserved. | Made with ❤️ for hoodie lovers</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PrimeHood