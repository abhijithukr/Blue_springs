import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ServiceCard.css';

export default function ServiceCard({ icon: Icon, title, description, to }) {
  return (
    <div className="card service-card">
      <div className="service-icon-wrapper">
        <Icon size={32} className="service-icon" />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
      {to && (
        <Link to={to} className="service-link">
          <span>Book This Service</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
