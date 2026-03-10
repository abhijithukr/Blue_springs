import React from 'react';
import { Star } from 'lucide-react';
import './ReviewCard.css';

export default function ReviewCard({ name, date, text, rating = 5 }) {
  return (
    <div className="card review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="reviewer-avatar">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="reviewer-name">{name}</h4>
            <span className="review-date">{date}</span>
          </div>
        </div>
        <div className="review-stars">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              fill={i < rating ? "var(--accent-gold)" : "none"} 
              color={i < rating ? "var(--accent-gold)" : "var(--border-color)"} 
            />
          ))}
        </div>
      </div>
      <p className="review-text">"{text}"</p>
    </div>
  );
}
