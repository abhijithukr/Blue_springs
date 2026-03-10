import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="brand">
          <div className="logo-icon">
             <Heart size={24} color="#1A73E8" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Blue Springs Dental Clinic</span>
            <span className="brand-malayalam">ബ്ലൂ സ്പ്രിംഗ്സ് ഡെന്റൽ ക്ലിനിക്</span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About Us</Link>
          <Link to="/reviews" className={`nav-link ${isActive('/reviews')}`}>Reviews</Link>
          <Link to="/pay" className={`nav-link ${isActive('/pay')}`}>Pay Online</Link>
          <Link to="/contact" className="btn btn-primary" style={{ marginLeft: '1rem' }}>Book Appointment</Link>
        </div>
      </div>
    </nav>
  );
}
