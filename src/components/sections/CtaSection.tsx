import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/clerk-react";
import { Check, Plane } from "lucide-react";
import { toast } from "sonner";

export const CtaSection = () => {
  return <section className="py-16 bg-partner-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-partner-500/20 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <Plane className="w-24 h-24 text-partner-400 rotate-12 mx-auto mb-6 opacity-70 animate-plane-bounce" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Elevate Your Travel Business?
                </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Take your travel business to new heights with MyPartnerKetakiWorld. Get access to exclusive international deals, real-time bookings, and unmatched partner support, all in one platform.
                </p>
          <SignUpButton mode="modal">
                  <Button size="lg" className="bg-partner-500 hover:bg-partner-600 text-white">Get Started</Button>
          </SignUpButton>
        </div>
      </div>
    </section>;
};
export default CtaSection;