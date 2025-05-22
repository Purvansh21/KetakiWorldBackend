import { Plane, Hotel, MapPin, Users, Clock } from "lucide-react";

export const CustomerNeedsSection = () => {
  const services = [
    {
      icon: <Plane className="h-6 w-6 text-wonder-600" />,
      title: "Flights (economy & business class)"
    },
    {
      icon: <Hotel className="h-6 w-6 text-wonder-600" />,
      title: "Hotels and resorts"
    },
    {
      icon: <MapPin className="h-6 w-6 text-wonder-600" />,
      title: "Sightseeing & transfers"
    },
    {
      icon: <Users className="h-6 w-6 text-wonder-600" />,
      title: "Group & custom packages"
    },
    {
      icon: <Clock className="h-6 w-6 text-wonder-600" />,
      title: "24x7 booking support"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything Your Customers Need | All in One Place
          </h2>
          <p className="text-xl text-gray-600">
            Offer your clients a seamless experience with our wide range of services:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="flex bg-white p-6 rounded-lg shadow-sm items-center animate-fade-in-up">
              <div className="mr-4 p-2 bg-wonder-50 rounded-full h-fit">
                {service.icon}
                </div>
              <div>
                <p className="text-gray-800 font-medium">{service.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerNeedsSection;
