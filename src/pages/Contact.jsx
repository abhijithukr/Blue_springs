import React from 'react';
import { MapPin, Phone, Globe, Clock, Star, Heart } from 'lucide-react';
import Button from '../components/Button';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Gather form data
    const formData = {
      fullName: e.target.fullName.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      date: e.target.date.value,
      time: e.target.time.value,
      service: e.target.service.value,
      message: e.target.message.value
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message });
        e.target.reset(); // Clear the form
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to book appointment' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again later or call the clinic.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-contact pt-24 pb-16">

      {/* Page Header */}
      <section className="bg-primary text-white py-16 mb-16" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="container text-center">
          <h1 className="heading-xl mb-4">Book Your Appointment</h1>
          <p className="text-lead opacity-90" style={{ color: 'rgba(255,255,255,0.9)' }}>
            We're open Mon–Sat, 9AM to 7PM
          </p>
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Booking Form */}
          <div className="card shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
            <h2 className="heading-md mb-6">Request an Appointment</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label" htmlFor="fullName">Full Name *</label>
                <input type="text" id="fullName" className="input-field" required placeholder="John Doe" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label" htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" className="input-field" required placeholder="+91 98765 43210" pattern="[0-9\+\-\s]+" />
                </div>
                <div className="input-group">
                  <label className="input-label" htmlFor="email">Email Address</label>
                  <input type="email" id="email" className="input-field" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label" htmlFor="date">Preferred Date *</label>
                  <input type="date" id="date" className="input-field" required />
                </div>
                <div className="input-group">
                  <label className="input-label" htmlFor="time">Preferred Time Slot</label>
                  <select id="time" className="input-field">
                    <option value="">Any Time</option>
                    <option value="9AM">9:00 AM</option>
                    <option value="10AM">10:00 AM</option>
                    <option value="11AM">11:00 AM</option>
                    <option value="12PM">12:00 PM</option>
                    <option value="2PM">2:00 PM</option>
                    <option value="3PM">3:00 PM</option>
                    <option value="4PM">4:00 PM</option>
                    <option value="5PM">5:00 PM</option>
                    <option value="6PM">6:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="service">Select Service *</label>
                <select id="service" className="input-field" required>
                  <option value="">Select a service...</option>
                  <option value="General Checkup">General Checkup</option>
                  <option value="Teeth Whitening">Teeth Whitening</option>
                  <option value="Root Canal">Root Canal Treatment</option>
                  <option value="Extraction">Tooth Extraction</option>
                  <option value="Orthodontics">Orthodontics / Braces</option>
                  <option value="Implants">Dental Implants</option>
                  <option value="Gum Treatment">Gum Treatment</option>
                  <option value="Pediatric">Pediatric Dentistry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="message">Message / Additional Notes</label>
                <textarea id="message" className="input-field" placeholder="Any specific concerns or symptoms..."></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full justify-center py-4 text-lg" disabled={isSubmitting}>
                {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
              </Button>

              {submitStatus && (
                <div className={`mt-4 p-4 rounded-lg text-center font-medium ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>

          {/* Clinic Info sidebar */}
          <div className="space-y-8">
            <div className="card">
              <h3 className="heading-md mb-6">Clinic Information</h3>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Address</h4>
                    <p className="text-secondary mt-1 max-w-sm">
                      NH 47 Pongumoodu, Chenthi Jn, Diagonally opposite IRIS, Thiruvananthapuram, Kerala 695011
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Phone</h4>
                    <p className="text-secondary mt-1">070127 70366</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Website</h4>
                    <a href="https://bluespringsdental.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mt-1 inline-block">
                      bluespringsdental.in
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Working Hours</h4>
                    <p className="text-secondary mt-1">Mon–Sat: 9:00 AM – 7:00 PM</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Star className="text-accent-gold" fill="currentColor" size={24} />
                  <div>
                    <p className="font-bold leading-none">4.5/5</p>
                    <p className="text-xs text-secondary mt-1">62 Google Reviews</p>
                  </div>
                </div>


              </div>
            </div>

            {/* Map Embed */}
            <div className="card p-2 overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.7276527582215!2d76.918925!3d8.525838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzEnMzMuMCJOIDc2wrA1NScwOC4xIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
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
    </div>
  );
}
