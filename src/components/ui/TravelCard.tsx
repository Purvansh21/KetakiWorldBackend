
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface TravelCardProps {
  title: string;
  description: string;
  imageSrc: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const TravelCard = ({
  title,
  description,
  imageSrc,
  ctaLabel = "Learn more",
  ctaHref = "#",
}: TravelCardProps) => {
  return (
    <div className="wonder-card overflow-hidden flex flex-col group">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-wonder-600 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <Button 
          variant="ghost" 
          className="text-wonder-600 hover:bg-wonder-50 hover:text-wonder-700 p-0 flex justify-start w-fit group-hover:translate-x-1 transition-transform"
        >
          {ctaLabel} <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TravelCard;
