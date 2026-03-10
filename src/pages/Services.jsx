import React from 'react';
import ServiceCard from '../components/ServiceCard';
import { 
  Activity, Sparkles, Syringe, Scissors, 
  Braces, Layers, Stethoscope, Baby 
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Activity,
      title: "General Dentistry",
      description: "Routine checkups, cleanings, and preventive care for maintaining healthy teeth and gums. We focus on early detection to prevent complex issues down the road."
    },
    {
      icon: Sparkles,
      title: "Teeth Whitening",
      description: "Professional whitening treatments for a brighter, more confident smile. Safe, effective, and tailored to give you the most natural-looking results."
    },
    {
      icon: Syringe,
      title: "Root Canal Treatment (RCT)",
      description: "Painless root canal procedures to save infected or damaged teeth. Using advanced equipment, we ensure a comfortable and quick recovery."
    },
    {
      icon: Scissors,
      title: "Tooth Extraction",
      description: "Safe and comfortable removal of problematic, severely decayed, or impacted wisdom teeth with minimal discomfort."
    },
    {
      icon: Braces,
      title: "Orthodontic Treatment",
      description: "Braces and aligner solutions for straightening teeth, closing gaps, and correcting bite issues for both teens and adults."
    },
    {
      icon: Layers,
      title: "Dental Implants",
      description: "Permanent tooth replacement solutions that look, feel, and function like natural teeth. The best long-term solution for missing teeth."
    },
    {
      icon: Stethoscope,
      title: "Gum Treatment (Periodontics)",
      description: "Advanced treatments for gum inflammation, pain, bleeding, and periodontal disease to restore complete oral health."
    },
    {
      icon: Baby,
      title: "Pediatric Dentistry",
      description: "Gentle, friendly, and patient dental care designed specifically for children to build healthy habits from an early age."
    }
  ];

  return (
    <div className="page-services pt-24 pb-16">
      {/* Page Header */}
      <section className="bg-primary text-white py-16 mb-12" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="container text-center">
          <h1 className="heading-xl mb-4">Our Dental Services</h1>
          <p className="text-lead opacity-90" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Comprehensive care for your entire family
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container">
        <div className="grid grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              to="/contact" 
            />
          ))}
        </div>
      </section>
    </div>
  );
}
