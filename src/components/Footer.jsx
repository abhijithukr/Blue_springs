import React from 'react';
import { Facebook, Instagram, Phone, MapPin, Globe } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer section-blue">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-title">Blue Springs Dental Clinic</h3>
            <p className="footer-malayalam">ബ്ലൂ സ്പ്രിംഗ്സ് ഡെന്റൽ ക്ലിനിക്</p>

            <p className="footer-desc">
              Trusted dental care in the heart of Thiruvananthapuram. Your smile is our priority.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/reviews">Reviews</a></li>
              <li><a href="/pay">Pay Online</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact Us</h4>
            <ul>
              <li>
                <MapPin size={18} />
                <span>NH 47 Pongumoodu, Chenthi Jn, Diagonally opposite IRIS, Thiruvananthapuram, Kerala 695011</span>
              </li>
              <li>
                <Phone size={18} />
                <span>070127 70366</span>
              </li>
              <li>
                <Globe size={18} />
                <a href="https://bluespringsdental.in" target="_blank" rel="noopener noreferrer">bluespringsdental.in</a>
              </li>
            </ul>
          </div>

          <div className="footer-social">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom flex justify-between items-center">
          <p>Copyright © {new Date().getFullYear()} Blue Springs Dental Clinic. All rights reserved.</p>
          <a href="/admin" className="text-xs opacity-50 hover:opacity-100 transition-opacity">Staff Login</a>
        </div>
      </div>
    </footer>
  );
}
