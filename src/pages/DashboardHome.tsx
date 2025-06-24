import { Card } from '@/components/ui/card';

const DashboardHome = () => {
  const travelPackages = [
    {
      id: 1,
      name: 'Europe Explorer',
      price: '€1,200',
      description: 'Discover the wonders of Europe with our curated package.',
    },
    {
      id: 2,
      name: 'Asian Adventure',
      price: '₹85,000',
      description: 'Embark on an unforgettable journey through Asia.',
    },
    {
      id: 3,
      name: 'Tropical Paradise',
      price: '$1,500',
      description: 'Relax and rejuvenate in a breathtaking tropical getaway.',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-partner-600">Our Exclusive Travel Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelPackages.map((pkg) => (
          <Card key={pkg.id} className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
            </div>
            <div className="mt-auto">
              <p className="text-2xl font-bold text-wonder-600">{pkg.price}</p>
              {/* Later we will add a payment gateway button here */}
              {/* <Button className="mt-4 w-full bg-partner-500 hover:bg-partner-600 text-white">Book Now</Button> */}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome; 