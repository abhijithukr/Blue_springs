import React from 'react';
import { Shield, CheckCircle, Heart, User, MapPin } from 'lucide-react';
import doctorImage from '../assets/images/doctor_profile_1773067870346.png';
import galleryImg1 from '../assets/images/gallery_1_1773067910493.png';

export default function About() {
  return (
    <div className="page-about pt-24 pb-16">

      {/* Our Story Header */}
      <section className="bg-primary text-white py-16 mb-16" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="container text-center">
          <h1 className="heading-xl mb-6">About Us</h1>
          <p className="text-lead max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Blue Springs Dental Clinic has been serving the people of Thiruvananthapuram with compassionate, high-quality dental care.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mb-24">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-lg mb-6">Our Story</h2>
            <p className="text-secondary mb-4 text-lg">
              Located conveniently on NH 47 near Chenthi Junction, opposite IRIS, our clinic is equipped with modern dental technology and staffed by experienced professionals dedicated to your oral health and comfort.
            </p>
            <p className="text-secondary text-lg">
              We believe in building lasting relationships with our patients based on trust, transparency, and clinical excellence. Whether it's a routine checkup or a complex procedure, our team ensures every visit is stress-free.
            </p>
            <div className="flex items-center gap-2 mt-6 text-primary font-medium">
              <MapPin size={20} /> NH 47 Pongumoodu, Thiruvananthapuram
            </div>
          </div>
          <div className="about-image-placeholder relative h-full min-h-[400px] glass rounded-2xl border-4 border-white shadow-lg overflow-hidden flex items-center justify-center bg-gray-100">
            <Heart size={64} className="text-primary opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Meet Our Doctor */}
      <section className="section-blue py-20 mb-24 rounded-3xl mx-4 lg:mx-auto max-w-6xl">
        <div className="container">
          <h2 className="heading-lg text-center mb-12">Meet Our Doctor</h2>
          <div className="card max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center p-8">
            <div className="doctor-avatar w-48 h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img src={doctorImage} alt="Dr. Ashok S" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-dark mb-2">Dr. Ashok S</h3>
              <p className="font-medium text-accent-gold mb-4">General & Restorative Dentistry</p>
              <p className="text-secondary leading-relaxed">
                "Dr. Ashok S is known for his professional approach, clear communication, and gentle treatment style. He has earned the trust of patients from across Thiruvananthapuram and beyond, including international patients."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container mb-24 text-center">
        <h2 className="heading-lg mb-12">Our Core Values</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="card">
            <div className="w-16 h-16 mx-auto bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Patient First</h3>
            <p className="text-secondary">Every decision is made with your comfort and well-being in mind.</p>
          </div>
          <div className="card border-primary/20 shadow-md transform -translate-y-2">
            <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center mb-6">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Honest Diagnosis</h3>
            <p className="text-secondary">We believe in complete transparency and never recommend unnecessary procedures.</p>
          </div>
          <div className="card">
            <div className="w-16 h-16 mx-auto bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 flex items-center justify-center gap-2">
              Inclusive Care
            </h3>
            <p className="text-secondary">We welcome all patients to our clinic environment.</p>
          </div>
        </div>
      </section>

      {/* Clinic Gallery */}
      <section className="container text-center">
        <h2 className="heading-lg mb-4">Clinic Gallery</h2>
        <p className="text-secondary mb-12">Take a tour of our modern facilities</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primary Gallery Image */}
          <div className="md:col-span-2 aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <img src={galleryImg1} alt="Clinic Operating Room" className="w-full h-full object-cover" />
          </div>

          {/* Placeholders for future images */}
          <div className="aspect-square bg-blue-50/50 rounded-xl flex flex-col items-center justify-center border border-dashed border-primary/20">
            <Heart size={32} className="text-primary/40 mb-2" />
            <span className="text-primary/60 text-sm font-medium">Coming Soon</span>
          </div>

          <div className="aspect-square md:col-start-3 bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-200">
            <span className="text-gray-400 text-sm font-medium">Coming Soon</span>
          </div>
        </div>
      </section>

    </div>
  );
}
