import { Button } from "@/components/ui/button";

export const TravelPortalInfoSection = () => {
  const steps = [
    "Enter your phone number and submit the OTP received.",
    "Fill in your personal information and upload your pan card.",
    "Next, upload your KYC documents (electricity bill, bank statement or business registration certificate).",
    "Lastly, complete your registration by accepting the T&Cs and creating a strong password."
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            B2B Travel Portal
          </h2>
          
          <div className="mb-12 space-y-4 text-gray-300">
            <p>
              In recent years, the travel industry has witnessed tremendous growth, paving the way for the emergence of several B2B travel portals catering to the needs of travel agents.
            </p>
            <p>
              The B2B travel portal plays a crucial role in fostering collaboration and facilitating seamless business relationships within the travel industry. Through the B2B travel agent portals, agents can make more bookings, get dynamic fares, and basically enable a more centralized system. These portals are developed to provide convenience, time-saving, and increased profitability.
            </p>
            <p>
              A B2B travel platform offers myriad benefits to travel agents, such as hotel and flight bookings. This platform aids agents in saving time and effort, enabling them to deliver superior service to their clients.
            </p>
            <p>
              The primary objective of a B2B travel agency for agents is to act as a bridge between travel agents, allowing them to remain in contact with the travel portal and provide improved plans and facilities for their customers. B2B travel portal has introduced a new paradigm in the travel industry, transforming the way travel agents and agencies operate and collaborate.
            </p>
          </div>
          
          <h3 className="text-2xl font-semibold mb-6">Steps to Apply</h3>
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-partner-600 flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <p className="text-lg font-medium text-partner-400">You're ready to grow your business!</p>
          </div>
          
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">
              Why Start Your Travel Business with Us?
            </h3>
            <div className="space-y-4">
              <p>
                With Wonder Holidays, you get the tools, support, and pricing needed to run a profitable travel business. From fast bookings to branded confirmations, you stay in control and ahead.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelPortalInfoSection;
