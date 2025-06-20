import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, User, Building2, MessageCircle, MapPin } from 'lucide-react';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const Contact = () => {
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
            <h1 className="text-4xl font-bold mb-2 text-partner-600">Contact Us</h1>
            <div className="w-24 h-1 bg-partner-400 rounded mb-8" />
            <p className="text-lg leading-relaxed mb-6">
              We're here to help! Whether you have a question about our platform, need support with a booking, or want to explore partnership opportunities, our team is ready to assist you.
            </p>

            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-6">Fill out the form below or reach out to us directly:</p>
              
              <div className="space-y-4 mb-8">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-partner-500" />Phone: <a href="tel:+919876543210" className="text-partner-600 underline">+91 98765 43210</a></p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-partner-500" />Email: <a href="mailto:support@mypartnerketakiworld.com" className="text-partner-600 underline">support@mypartnerketakiworld.com</a></p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-partner-500" />Address: 123 Travel Lane, Tourism City, India</p>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Input type="text" id="name" placeholder="Your Name" className="mt-1 block w-full" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input type="email" id="email" placeholder="Your Email" className="mt-1 block w-full" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <Input type="text" id="subject" placeholder="Subject of your inquiry" className="mt-1 block w-full" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" rows={4} placeholder="Your Message" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-partner-500 focus:ring-partner-500"></textarea>
                </div>
                <Button type="submit" className="bg-partner-500 hover:bg-partner-600 text-white">
                  Send Message
                </Button>
              </form>
              </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Office Hours</h2>
              <p className="text-gray-600 mb-4">We are available during the following hours:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                <li>Saturday: 10:00 AM - 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact; 