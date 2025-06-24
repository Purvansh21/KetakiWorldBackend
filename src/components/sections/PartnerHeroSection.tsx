import { Button } from "@/components/ui/button";
import { Globe, Plane, Briefcase, Award } from "lucide-react";

export const PartnerHeroSection = () => {
  return (
    <section className="py-12 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-wonder-50 to-partner-50 rounded-xl p-8 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wonder-400 to-partner-400"></div>
          
          <div className="md:w-2/3">
            <div className="flex items-center mb-4">
              <div className="relative mr-4">
                <div className="bg-partner-100 rounded-full h-20 w-20 flex items-center justify-center shadow-inner">
                  <Plane className="h-10 w-10 text-partner-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-wonder-100 rounded-full h-8 w-8 flex items-center justify-center shadow-sm border-2 border-white">
                  <Award className="h-4 w-4 text-wonder-600" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  Become a <span className="text-wonder-600">MyPartner</span><span className="text-partner-600">KetakiWorld</span> Partner
                </h2>
                <p className="text-lg text-gray-700">Get Exclusive Rewards & Benefits!</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mt-6 md:mt-0">
            {/* Removed cashback and recharge incentive cards */}
          </div>
        </div>
        
        <div className="mt-6 bg-gradient-to-r from-wonder-600 to-partner-600 text-white p-5 rounded-lg text-center shadow-md">
          <p className="font-medium">Everything Your Customers Need | All in One Place</p>
        </div>
      </div>
    </section>
  );
};

export default PartnerHeroSection;
