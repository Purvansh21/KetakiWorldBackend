import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, User, Building2, MessageCircle } from 'lucide-react';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const Contact = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-wonder-50 to-partner-50">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16">
          <ScrollToTopButton />
          <div className="container mx-auto px-4 max-w-2xl animate-fade-in">
            <button
              className="mb-8 px-4 py-2 bg-partner-500 text-white rounded hover:bg-partner-600 transition"
              onClick={() => navigate('/')}
            >
              ← Back to Home
            </button>
            <h1 className="text-4xl font-bold mb-2 text-partner-600">Contact Us</h1>
            <div className="w-24 h-1 bg-partner-400 rounded mb-8" />
            <p className="text-lg mb-8">Have questions or want to learn more about becoming a partner? We're here to help! Reach out to us anytime, and one of our team members will get back to you promptly.</p>
            <form className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4 mb-8 animate-fade-in-up border border-gray-300">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 flex items-center gap-1"><User className="w-4 h-4 text-partner-500" />Full Name</label>
                  <input type="text" className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800" required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 flex items-center gap-1"><Building2 className="w-4 h-4 text-partner-500" />Company Name</label>
                  <input type="text" className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 flex items-center gap-1"><Mail className="w-4 h-4 text-partner-500" />Email Address</label>
                  <input type="email" className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800" required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 flex items-center gap-1"><Phone className="w-4 h-4 text-partner-500" />Phone Number</label>
                  <input type="tel" className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1"><MessageCircle className="w-4 h-4 text-partner-500" />Message</label>
                <textarea className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800" rows={4} required></textarea>
              </div>
              <button type="submit" className="bg-partner-500 hover:bg-partner-600 text-white font-semibold px-6 py-2 rounded">Submit</button>
            </form>
            <div className="bg-white p-4 rounded shadow text-gray-700 animate-fade-in-up">
              <p className="mb-2 font-semibold">Or reach us directly at:</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-partner-500" />Email: <a href="mailto:support@wonderholidays.com" className="text-partner-600 underline">support@wonderholidays.com</a></p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-partner-500" />Phone: <a href="tel:+911234567890" className="text-partner-600 underline">+91 12345 67890</a></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact; 