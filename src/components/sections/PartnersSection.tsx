
export const PartnersSection = () => {
  // Partner logos - normally these would be actual logo images
  const partners = [
    { name: "AirTravel", style: "font-bold text-blue-600" },
    { name: "HotelExpress", style: "font-bold text-red-500" },
    { name: "GlobalRail", style: "font-bold text-green-600" },
    { name: "CruiseLines", style: "font-bold text-purple-600" },
    { name: "CarHire", style: "font-bold text-orange-500" },
    { name: "TravelInsure", style: "font-bold text-teal-600" },
  ];

  return (
    <section id="partners" className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Trusted by Leading Travel Providers
        </h2>
        <p className="text-center text-gray-600 mb-12">
          We partner with top travel companies to offer you the best deals and services
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex justify-center">
              <div className={`text-xl ${partner.style} hover:scale-110 transition-transform duration-300`}>
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
