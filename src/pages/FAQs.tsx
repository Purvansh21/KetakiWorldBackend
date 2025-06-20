import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const faqs = [
  {
    question: "How do I sign up to become a partner with MyPartnerKetakiWorld?",
    answer: "You can easily sign up by providing your phone number, uploading your KYC documents, and completing the registration steps on our platform."
  },
  {
    question: "What kind of travel services can I book through MyPartnerKetakiWorld?",
    answer: "You can book flights, hotels, resorts, and complete travel packages worldwide through our platform."
  },
  {
    question: "Are there any hidden fees or charges when booking?",
    answer: "No. We provide transparent pricing with no hidden charges, so you always know what you are paying."
  },
  {
    question: "Can I customize booking confirmations with my agency's logo?",
    answer: "Yes, all booking confirmations are white-labeled with your agency's branding to maintain professionalism."
  },
  {
    question: "What is the inventory size for flights and hotels?",
    answer: "We offer access to over 150 airline carriers and more than 4,00,000 hotel properties worldwide."
  },
  {
    question: "Is my customer's information secure with MyPartnerKetakiWorld?",
    answer: "Absolutely. We ensure one hundred percent confidentiality and security of all booking and customer data."
  },
  {
    question: "What kind of support does MyPartnerKetakiWorld provide to partners?",
    answer: "Our team offers quick and reliable support to help you resolve queries and assist with bookings whenever you need."
  },
  {
    question: "Can I manage multiple bookings for different clients at the same time?",
    answer: "Yes, our platform is designed to help you handle multiple bookings efficiently and simultaneously."
  },
  {
    question: "Are there any special rates or discounts available to partners?",
    answer: "Yes, partners benefit from exclusive rates and deals not available to the general public."
  },
  {
    question: "Can I use MyPartnerKetakiWorld to expand my business internationally?",
    answer: "Yes, our platform offers a wide international inventory to help you serve customers traveling worldwide."
  },
  {
    question: "How quickly are bookings confirmed on the platform?",
    answer: "Most bookings are confirmed instantly, ensuring a smooth and fast experience for you and your customers."
  },
  {
    question: "Can I access MyPartnerKetakiWorld on mobile devices?",
    answer: "Yes, our platform is fully responsive and works seamlessly on smartphones and tablets."
  },
  {
    question: "Is there any training or onboarding support for new partners?",
    answer: "Yes, we provide easy-to-follow guides and support to help you get started quickly and confidently."
  },
  {
    question: "Can I cancel or modify bookings through MyPartnerKetakiWorld?",
    answer: "Yes, you can manage cancellations and modifications directly from the platform, subject to the provider's policies."
  },
  {
    question: "Are there any minimum booking requirements or fees to join?",
    answer: "No, there are no minimum booking requirements or joining fees. You can start using the platform right away."
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-8 h-8 text-partner-600" />
              <h1 className="text-4xl font-bold text-partner-600">FAQs</h1>
            </div>
            <div className="w-24 h-1 bg-partner-400 rounded mb-8" />
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border rounded-lg shadow-sm animate-fade-in-up">
                  <button
                    className="w-full text-left px-6 py-4 font-semibold text-lg focus:outline-none flex justify-between items-center"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  >
                    {faq.question}
                    <span className={`ml-2 transition-transform ${openIndex === idx ? 'rotate-90' : ''}`}>▶</span>
                  </button>
                  {openIndex === idx && (
                    <div className="px-6 pb-4 text-gray-700 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs; 