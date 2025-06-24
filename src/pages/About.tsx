import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Shield, Users, Lock, Zap } from 'lucide-react';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const aboutList = [
  { icon: <Star className="text-partner-500 w-6 h-6" />, text: 'Wide selection of flights and hotels worldwide' },
  { icon: <Zap className="text-partner-500 w-6 h-6" />, text: 'Easy and fast booking system' },
  { icon: <CheckCircle className="text-partner-500 w-6 h-6" />, text: 'Exclusive rates for travel agents' },
  { icon: <Users className="text-partner-500 w-6 h-6" />, text: 'Booking confirmations with your agency\'s logo' },
  { icon: <Shield className="text-partner-500 w-6 h-6" />, text: 'Quick and reliable customer support' },
  { icon: <Lock className="text-partner-500 w-6 h-6" />, text: 'Full privacy and security for your customer data' },
];

const About = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-wonder-50 to-partner-50">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16">
          <ScrollToTopButton />
          <div className="container mx-auto px-4 max-w-3xl animate-fade-in">
            <button
              className="mb-8 px-4 py-2 bg-partner-500 text-white rounded hover:bg-partner-600 transition"
              onClick={() => navigate('/')}
            >
              ← Back to Home
            </button>
            <h1 className="text-4xl font-bold mb-2 text-partner-600">About Us</h1>
            <div className="w-24 h-1 bg-partner-400 rounded mb-8" />
            <h2 className="text-2xl font-semibold mb-4">Your Trusted Travel Partner</h2>
            <p className="text-lg leading-relaxed mb-6">
              At MyPartnerKetakiWorld, we help travel agents grow their business by making travel bookings simpler, faster, and more reliable. Our platform is designed to give you access to the best deals on flights, hotels, and travel packages all in one place.
            </p>
            <p className="text-lg leading-relaxed">
              <span className="font-semibold text-partner-600">MyPartnerKetakiWorld is made for agents who want more from their travel platform.</span>
              Whether you're a solo agent or a large agency, our tools empower you to serve your clients better and boost your profits.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">What Sets Us Apart</h3>
            <ul className="space-y-4 mb-6">
              {aboutList.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About; 