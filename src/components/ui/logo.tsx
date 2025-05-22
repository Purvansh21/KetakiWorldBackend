
import { Globe, Plane } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "white";
  showIcon?: boolean;
  size?: "default" | "small" | "large";
}

export function Logo({ 
  variant = "default", 
  showIcon = true,
  size = "default"
}: LogoProps) {
  const textColor = variant === "white" ? "text-white" : "text-gray-900";
  const accentColor = variant === "white" ? "text-partner-300" : "text-partner-500";
  
  const sizeClasses = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-3xl md:text-4xl"
  };
  
  return (
    <Link to="/" className="flex items-center gap-2">
      {showIcon && (
        <div className="relative">
          <Globe className={`w-6 h-6 ${size === "large" ? "w-8 h-8" : ""} ${accentColor}`} />
          <Plane 
            className={`absolute -top-1 -right-1 w-3 h-3 ${size === "large" ? "w-4 h-4" : ""} text-wonder-500 transform -rotate-45`} 
          />
        </div>
      )}
      <span className={`font-bold ${sizeClasses[size]} ${textColor}`}>
        Wonder<span className={accentColor}>Holidays</span>
      </span>
    </Link>
  );
}

export default Logo;
