import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Button from '../components/Button';
import ReviewCard from '../components/ReviewCard';

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = [
    'All', 'Root Canal', 'Tooth Extraction', 'Orthodontic Treatment', 
    'Appointment', 'Staff', 'Teeth Whitening'
  ];

  const reviews = [
    {
      name: "Zoumana Zanga Cisse",
      date: "1 month ago",
      text: "Dr. Ashok S was professional and explained everything clearly. The staff were very polite and supportive. As a foreign student, I felt completely at ease.",
      rating: 5,
      tags: ['Staff', 'Appointment']
    },
    {
      name: "Sarang Viswanathan",
      date: "1 year ago",
      text: "Excellent experience for a tooth extraction. Dr. Asok was highly professional and made me feel very comfortable.",
      rating: 5,
      tags: ['Tooth Extraction']
    },
    {
      name: "Manju Sudersanan",
      date: "5 months ago",
      text: "Dr. Ashok gave a second honest opinion and saved my tooth from unnecessary extraction. Truly trustworthy care.",
      rating: 5,
      tags: ['Root Canal']
    },
    {
      name: "Aswin Kumar",
      date: "2 months ago",
      text: "Great staff and teeth whitening on top! Good experience overall.",
      rating: 5,
      tags: ['Staff', 'Teeth Whitening']
    },
    {
      name: "Priya S Menon",
      date: "3 months ago",
      text: "Both the nurses and doctors are friendly, calm, and patient. Best clinic for orthodontic treatment.",
      rating: 4,
      tags: ['Staff', 'Orthodontic Treatment']
    }
  ];

  const filteredReviews = activeFilter === 'All' 
    ? reviews 
    : reviews.filter(r => r.tags.includes(activeFilter));

  return (
    <div className="page-reviews pt-24 pb-16">
      
      <section className="bg-primary text-white py-16 mb-16" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="container text-center">
          <h1 className="heading-xl mb-4">Patient Reviews</h1>
          <p className="text-lead opacity-90" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Real experiences from our valued patients
          </p>
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Rating Summary (Left Sidebar) */}
          <div className="md:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Google Rating</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-extrabold text-primary-dark">4.5</span>
                <div>
                  <div className="flex text-accent-gold mb-1">
                    {[...Array(4)].map((_, i) => <Star key={i} size={20} fill="currentColor" color="currentColor" />)}
                    <Star size={20} fill="url(#half-star)" color="currentColor" />
                  </div>
                  <p className="text-sm text-secondary">Based on 62 reviews</p>
                </div>
              </div>
              
              {/* Progress Bars */}
              <div className="space-y-3 mb-8">
                {[
                  { stars: 5, count: 48 },
                  { stars: 4, count: 8 },
                  { stars: 3, count: 4 },
                  { stars: 2, count: 1 },
                  { stars: 1, count: 1 }
                ].map((item) => (
                  <div key={item.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-12 text-secondary">{item.stars} stars</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-gold rounded-full" 
                        style={{ width: `${(item.count / 62) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col gap-3">
                <Button href="https://g.page/r/YOUR_GOOGLE_LINK/review" variant="primary" className="w-full">
                  Write a Review
                </Button>
                <Button href="https://g.page/r/YOUR_GOOGLE_LINK/review" variant="outline" className="w-full">
                  See All 62 Reviews
                </Button>
              </div>
            </div>
          </div>
          
          {/* Reviews List & Filters (Right Side) */}
          <div className="md:col-span-2">
            
            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 mb-8 border-b pb-6">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`badge cursor-pointer transition-colors ${
                    activeFilter === filter 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-secondary border-gray-200 border border-solid hover:bg-gray-50'
                  }`}
                  style={activeFilter === filter ? { backgroundColor: 'var(--primary)', color: 'white' } : {}}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Review Cards */}
            <div className="space-y-6">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review, index) => (
                  <ReviewCard 
                    key={index}
                    name={review.name}
                    date={review.date}
                    text={review.text}
                    rating={review.rating}
                  />
                ))
              ) : (
                <p className="text-center text-secondary py-8 bg-gray-50 rounded-lg">
                  No reviews found for this category yet.
                </p>
              )}
            </div>

          </div>
        </div>
      </section>
      
      {/* SVG Definitions for custom icons like half star */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="var(--accent-gold)" />
            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
