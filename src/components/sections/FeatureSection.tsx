
import { CheckCircle } from "lucide-react";

export const FeatureSection = () => {
  const features = [
    {
      title: "Streamlined Booking Process",
      description: "Unified platform for flights, hotels, trains, and car rentals with personalized options for all your business travel needs.",
      checks: ["Single interface", "AI-powered recommendations", "Personalized options"]
    },
    {
      title: "Cost Control & Savings",
      description: "Smart algorithms and negotiated rates to ensure you always get the best value for your business travel investment.",
      checks: ["Corporate rates", "Budget controls", "Expense tracking"]
    },
    {
      title: "24/7 Travel Support",
      description: "Round-the-clock assistance for your travelers, ensuring smooth journeys even when unexpected changes occur.",
      checks: ["Global coverage", "Multi-language support", "Rapid response"]
    },
    {
      title: "Sustainability Initiatives",
      description: "Carbon tracking and offsetting options to help your business meet environmental goals while traveling.",
      checks: ["Carbon reporting", "Offset programs", "Green travel options"]
    }
  ];

  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for <span className="gradient-text">Business Travel</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive travel management solution combines powerful technology with expert service to transform your corporate travel program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="wonder-card p-8 hover:border-wonder-200 transition-all duration-200"
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.checks.map((check, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-wonder-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-to-r from-wonder-50 to-partner-50 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center md:border-r border-gray-200 p-4">
              <div className="text-4xl font-bold text-wonder-600 mb-2">30%</div>
              <p className="text-gray-700">Average savings on travel spend</p>
            </div>
            <div className="flex flex-col items-center text-center md:border-r border-gray-200 p-4">
              <div className="text-4xl font-bold text-wonder-600 mb-2">92%</div>
              <p className="text-gray-700">Traveler satisfaction rate</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="text-4xl font-bold text-wonder-600 mb-2">3.5h</div>
              <p className="text-gray-700">Average time saved per booking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
