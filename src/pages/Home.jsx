import React from 'react';
import { Star, CheckCircle, Clock, Shield, Heart } from 'lucide-react';
import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';
import ReviewCard from '../components/ReviewCard';
import './Home.css';
import heroBanner from '../assets/images/hero_banner_1773067841571.png';

// Placeholder icons for services
import { Activity, Sparkles, Syringe, Scissors, Braces, Layers } from 'lucide-react';

export default function Home() {
  return (
    <div className="page-home">
      {/* Hero Section */}
      <section className="hero section section-light">
        <div className="container hero-container">
          <div className="hero-content animate-fade-in">

            <h1 className="heading-xl hero-title">Your Smile Is Our Priority</h1>
            <p className="text-lead hero-subtitle">
              Trusted dental care in the heart of Thiruvananthapuram. We provide a clean, clinical, and calming experience for patients of all ages.
            </p>

            <div className="hero-actions">
              <Button to="/contact" variant="primary">Book an Appointment</Button>
              <Button href="tel:07012770366" variant="outline" className="hidden-mobile">Call Us Now: 070127 70366</Button>
            </div>

            <div className="hero-rating mt-8 border-t pt-4">
              <div className="flex items-center gap-2">
                <div className="flex text-accent-gold">
                  {[...Array(4)].map((_, i) => <Star key={i} size={20} fill="currentColor" color="currentColor" />)}
                  <Star size={20} fill="url(#half-star)" color="currentColor" />
                </div>
                <span className="font-bold text-lg">4.5 / 5</span>
              </div>
              <p className="text-sm text-text-secondary mt-1">Based on 62 Google Reviews</p>
            </div>
          </div>

          <div className="hero-image-wrapper animate-fade-in delay-200">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative">
              <img src={heroBanner} alt="Blue Springs Dental Clinic Reception" className="w-full h-auto object-cover" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow font-medium text-primary text-sm flex items-center gap-2">
                <CheckCircle size={16} /> Modern Facilities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us section section-blue">
        <div className="container text-center">
          <h2 className="heading-lg mb-12">Why Choose Blue Springs</h2>

          <div className="grid grid-cols-4 gap-8">
            <div className="card feature-card">
              <div className="feature-icon"><CheckCircle size={32} /></div>
              <h3 className="feature-title">Expert Doctors</h3>
              <p className="text-secondary text-sm">Led by Dr. Ashok S, offering professional and gentle care.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon"><Heart size={32} /></div>
              <h3 className="feature-title">Friendly Staff</h3>
              <p className="text-secondary text-sm">Our polite and supportive team ensures a comfortable visit.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon"><Shield size={32} /></div>
              <h3 className="feature-title">Modern Equipment</h3>
              <p className="text-secondary text-sm">Advanced techniques and hygienic clinical environment.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon"><Clock size={32} /></div>
              <h3 className="feature-title">Comfort for All</h3>
              <p className="text-secondary text-sm">A welcoming, inclusive space for every patient.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview section section-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Our Dental Services</h2>
            <p className="text-lead text-muted max-w-2xl mx-auto">Comprehensive treatments tailored to your unique smile.</p>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
            <ServiceCard
              icon={Activity}
              title="General Dentistry"
              description="Routine checkups, cleanings, and preventive care for maintaining healthy teeth."
              to="/services"
            />
            <ServiceCard
              icon={Sparkles}
              title="Teeth Whitening"
              description="Professional whitening treatments for a brighter, more confident smile."
              to="/services"
            />
            <ServiceCard
              icon={Syringe}
              title="Root Canal (RCT)"
              description="Painless root canal procedures to save infected or damaged teeth."
              to="/services"
            />
            <ServiceCard
              icon={Scissors}
              title="Tooth Extraction"
              description="Safe and comfortable removal of problematic teeth with minimal discomfort."
              to="/services"
            />
            <ServiceCard
              icon={Braces}
              title="Orthodontics"
              description="Braces and aligner solutions for straightening teeth and correcting bite issues."
              to="/services"
            />
            <ServiceCard
              icon={Layers}
              title="Dental Implants"
              description="Permanent tooth replacement solutions that look and feel completely natural."
              to="/services"
            />
          </div>

          <div className="text-center">
            <Button variant="outline" to="/services">View All Services</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Strip */}
      <section className="testimonials section section-blue">
        <div className="container">
          <h2 className="heading-lg text-center mb-12">Patient Testimonials</h2>

          <div className="grid grid-cols-3 gap-8">
            <ReviewCard
              name="Zoumana Zanga Cisse"
              date="Local Guide"
              text="I visited Blue Springs Dental Clinic today with a dental issue, and it was handled excellently. Dr. Ashok S was professional and explained everything clearly. The staff were very polite and supportive."
              rating={5}
            />
            <ReviewCard
              name="Sarang Viswanathan"
              date="Local Guide"
              text="I recently visited Blue Spring Dental Clinic for a tooth extraction, and had an excellent experience. Dr. Asok was highly professional and made me feel very comfortable."
              rating={5}
            />
            <ReviewCard
              name="Manju Sudersanan"
              date="Patient"
              text="Dr. Ashok gave a second opinion that saved my tooth. Highly recommend this clinic for honest and skilled dental care."
              rating={5}
            />
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary" to="/reviews">Read More Reviews</Button>
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="location section section-light">
        <div className="container">
          <div className="location-grid">
            <div className="location-info">
              <h2 className="heading-lg mb-6">Visit Our Clinic</h2>
              <div className="info-block mb-6">
                <h4 className="font-bold text-lg mb-2">Address</h4>
                <p className="text-secondary text-lg">NH 47 Pongumoodu, Chenthi Jn<br />(Diagonally opposite IRIS)<br />Thiruvananthapuram, Kerala 695011</p>
                <div className="mt-2 text-primary font-medium">Plus Code: GWVF+G3</div>
              </div>

              <div className="info-block mb-8">
                <h4 className="font-bold text-lg mb-2">Working Hours</h4>
                <p className="text-secondary text-lg">Mon–Sat: 9:00 AM – 7:00 PM<br /><span className="text-sm">(Closed on certain days — please confirm)</span></p>
              </div>

              <Button href="https://maps.google.com/?q=Blue+Springs+Dental+Clinic+Pongumoodu" variant="primary">Get Directions</Button>
            </div>

            <div className="location-map card p-2">
              {/* Embed Google Map iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.7276527582215!2d76.918925!3d8.525838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzEnMzMuMCJOIDc2wrA1NScwOC4xIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Blue Springs Dental Clinic Location"
              ></iframe>
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
