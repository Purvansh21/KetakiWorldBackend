import { Check, Shield, Phone, Bell, Star, Award } from "lucide-react";

export const PartnerBenefitsSection = () => {
  const benefits = [
    { 
      icon: <Award className="h-8 w-8 text-wonder-600" />, 
      title: "BEST EVER RATES", 
      description: "Enjoy best-ever rates with exclusive deals for our partners." 
    },
    { 
      icon: <Check className="h-8 w-8 text-wonder-600" />, 
      title: "WIDEST INVENTORY", 
      description: "150+ Airline carriers and 4 lac+ hotel properties" 
    },
    { 
      icon: <Phone className="h-8 w-8 text-wonder-600" />, 
      title: "EXPRESS CARE", 
      description: "Easy-to-use tools for query resolutions" 
    },
    { 
      icon: <Shield className="h-8 w-8 text-wonder-600" />, 
      title: "CONFIDENTIALITY ASSURED", 
      description: "Complete confidentiality of your customer details & bookings" 
    },
  ];

  return (
    <section id="why-partner" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="text-wonder-600">Wonder</span><span className="text-partner-600">Holidays</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us to discover the smart way to grow your business
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-start">
                <div className="mb-4 p-3 bg-wonder-50 rounded-full">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerBenefitsSection;
