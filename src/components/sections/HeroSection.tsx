import { useState, memo, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plane } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/ui/logo";
import { Globe } from "@/components/ui/globe";
import { useInView } from "react-intersection-observer";
import { SignInButton, SignUpButton } from '@clerk/clerk-react';

// Memoize static content
const TrustedBySection = memo(() => (
  <div className="flex items-center gap-3 justify-center sm:justify-start">
    <div className="flex items-center gap-2">
      <Check className="w-5 h-5 text-partner-400" />
      <span className="text-sm text-gray-300 whitespace-nowrap">Trusted by 2,500+ businesses worldwide</span>
    </div>
  </div>
));

const FeaturesList = memo(() => (
  <div className="flex flex-col sm:flex-row gap-4 mb-8">
    <div className="flex items-center gap-2">
      <Check className="w-5 h-5 text-partner-400" />
      <span className="font-medium">Best Deals on Flights</span>
    </div>
    <div className="flex items-center gap-2">
      <Check className="w-5 h-5 text-partner-400" />
      <span className="font-medium">Widest Range of Hotels</span>
    </div>
  </div>
));

// Optimize plane animation with transform and will-change
const PlaneAnimation = memo(() => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "50px"
  });

  return (
    <div ref={ref} className="absolute top-1/3 left-0 z-10 transform-gpu">
      {inView && (
        <div className="animate-plane-fly will-change-transform">
          <Plane className="w-20 h-20 text-partner-400 transform -rotate-12" />
        </div>
      )}
    </div>
  );
});

// Optimize globe section with hardware acceleration
const GlobeSection = memo(() => {
  return (
    <div className="lg:w-1/2 flex flex-col items-center justify-center gap-4 relative transform-gpu">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] z-0 pointer-events-none will-change-transform">
        <Globe className="w-full h-full" />
      </div>
      <div className="max-w-md w-full mx-auto relative z-10 mt-[120px] lg:mt-[160px]">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 text-gray-900 w-full mx-auto">
          <h2 className="text-2xl font-bold mb-2">Get Started</h2>
          <p className="text-gray-600 mb-6">Log in or create an account using your mobile number</p>
          <SignInButton mode="modal">
            <Button className="bg-partner-500 hover:bg-partner-600 text-white w-full">Get Started</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
});

// Optimize header content with hardware acceleration
const HeaderContent = memo(() => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "50px"
  });

  return (
    <div ref={ref} className={`transform-gpu ${inView ? "animate-fade-in" : ""}`}>
      <div className="mb-6">
        <Logo variant="white" size="large" />
      </div>
      
      <div className="flex items-center mb-4">
        <span className="text-sm bg-partner-500/90 text-white px-3 py-1 rounded-full">
          Preferred by 40,000+ Travel Agents
        </span>
      </div>
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-left text-gray-900 leading-tight mb-6">
        Grow Your Travel Business with MyPartnerKetakiWorld
      </h1>
      
      <p className="text-xl text-gray-300 mb-8 max-w-xl text-left">
        Get access to unbeatable international travel deals, real-time booking tools, and personalized support built for travel agents like you.
      </p>
    </div>
  );
});

// Memoize the action buttons
const ActionButtons = memo(() => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
    <SignUpButton mode="modal">
    <Button className="bg-partner-500 hover:bg-partner-600 text-white">Become a Partner</Button>
    </SignUpButton>
    <SignInButton mode="modal">
    <Button variant="secondary">Login</Button>
    </SignInButton>
  </div>
));

// Optimize wave divider with hardware acceleration
const WaveDivider = memo(() => (
  <div className="absolute bottom-0 left-0 right-0 transform-gpu">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
      <path
        fill="#ffffff"
        fillOpacity="1"
        d="M0,80 C320,160 1120,0 1440,80 L1440,120 L0,120 Z"
      />
    </svg>
                    </div>
));

export const HeroSection = () => {
  return (
    <section id="hero" className="relative bg-gradient-to-b from-wonder-900 to-wonder-800 overflow-hidden text-white transform-gpu">
      <PlaneAnimation />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-partner-600/20 via-wonder-900/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center lg:items-center lg:justify-between">
          <div className="w-full lg:w-1/2">
            <HeaderContent />
            <FeaturesList />
            
            <div className="mt-8 flex flex-col gap-4">
              <TrustedBySection />
              <ActionButtons />
            </div>
          </div>
          
          <GlobeSection />
        </div>
      </div>
      
      <WaveDivider />
    </section>
  );
};

export default memo(HeroSection);
