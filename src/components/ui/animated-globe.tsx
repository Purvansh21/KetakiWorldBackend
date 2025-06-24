
import { Globe, Plane } from "lucide-react";
import { useEffect, useState } from "react";

export function AnimatedGlobe() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Base globe with rotation animation */}
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 animate-spin-slow">
            {/* Main globe */}
            <Globe strokeWidth={1.5} className="absolute inset-0 w-full h-full text-wonder-600" />
            
            {/* Orbit circles */}
            <div className="absolute inset-0 w-full h-full rounded-full border-2 border-dashed border-partner-300/30 rotate-12"></div>
            <div className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full border border-dashed border-wonder-300/30 -rotate-12"></div>
          </div>
        </div>
        
        {/* Flying plane animations */}
        <div className="absolute top-[40%] left-[-10%] animate-plane-fly">
          <Plane className="w-8 h-8 text-partner-500 transform -rotate-12" />
        </div>
        
        {/* Additional flying planes */}
        <div className="absolute top-[20%] right-[15%] animate-float">
          <Plane className="w-4 h-4 text-wonder-500 transform rotate-45" />
        </div>
        <div className="absolute bottom-[15%] left-[20%] animate-float" style={{ animationDelay: '3s' }}>
          <Plane className="w-5 h-5 text-partner-600 transform -rotate-12" />
        </div>
      </div>
    </div>
  );
}

export default AnimatedGlobe;
