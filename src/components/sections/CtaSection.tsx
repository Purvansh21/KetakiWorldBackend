import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/ui/auth-dialog";

export const CtaSection = () => {
  return <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-wonder-600 to-partner-600 rounded-2xl overflow-hidden">
          <div className="relative px-8 py-12 md:p-16">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="800" height="800" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between text-white gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Join India's Fastest Growing B2B Travel Platform
                </h2>
                <p className="text-lg md:text-xl text-white/90 max-w-lg">
                  Take your travel business to new heights with WonderHolidays. Get access to exclusive international deals, real-time bookings, and unmatched partner support, all in one platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <AuthDialog>
                  <Button size="lg" className="bg-partner-500 hover:bg-partner-600 text-white">Get Started</Button>
                </AuthDialog>
                <AuthDialog>
                  <Button size="lg" variant="secondary">Login</Button>
                </AuthDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CtaSection;