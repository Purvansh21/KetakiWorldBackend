import { Check } from "lucide-react";

export const AdvantagesSection = () => {
  const advantages = [
    {
      icon: <Check className="h-6 w-6 text-wonder-600" />,
      title: "Best international B2B rates"
    },
    {
      icon: <Check className="h-6 w-6 text-wonder-600" />,
      title: "150+ airlines & 4 lakh+ hotels"
    },
    {
      icon: <Check className="h-6 w-6 text-wonder-600" />,
      title: "Branded booking under your agency name"
    },
    {
      icon: <Check className="h-6 w-6 text-wonder-600" />,
      title: "100% client confidentiality"
    },
    {
      icon: <Check className="h-6 w-6 text-wonder-600" />,
      title: "24x7 support with Express Care"
    },
    {
      icon: <Check className="h-6 w-6 text-wonder-600" />,
      title: "Easy cancellations & reliable service"
    }
  ];

  return (
    <section id="advantages" className="py-16 bg-gray-50 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-12">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Travel Agents Trust Wonder Holidays
            </h2>
            <div className="hidden md:block relative">
              <img 
                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd" 
                alt="Travel platform dashboard" 
                className="rounded-lg shadow-xl"
              />
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex bg-white p-6 rounded-lg shadow-sm animate-fade-in">
                <div className="mr-4 p-2 bg-wonder-50 rounded-full h-fit">
                  {advantage.icon}
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{advantage.title}</p>
                </div>
              </div>
            ))}
            
            <div className="md:hidden col-span-2 mt-8">
              <img 
                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd" 
                alt="Travel platform dashboard" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        {/* New Section: Why Travel Agents Prefer Wonder Holidays */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Travel Agents Prefer Wonder Holidays</h3>
          <ul className="max-w-2xl mx-auto space-y-4 text-lg">
            <li className="flex items-start gap-2"><Check className="mt-1 text-partner-500" />Unbeatable Pricing: Access special B2B-only rates for flights and hotels</li>
            <li className="flex items-start gap-2"><Check className="mt-1 text-partner-500" />Massive Inventory: Over 4 lakh hotels and 150+ international airlines</li>
            <li className="flex items-start gap-2"><Check className="mt-1 text-partner-500" />White-Label Support: Booking confirmations carry your agency's name</li>
            <li className="flex items-start gap-2"><Check className="mt-1 text-partner-500" />Express Care: Real-time query resolution and partner-first support</li>
            <li className="flex items-start gap-2"><Check className="mt-1 text-partner-500" />Data Confidentiality: Your client info stays yours</li>
            <li className="flex items-start gap-2"><Check className="mt-1 text-partner-500" />Hassle-Free Cancellations: Fair policies, flexible options</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
