"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Testimonial {
  company: string;
  avatar: string;
  name: string;
  role: string;
  review: string;
}

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  companyLogoPath?: string;
  avatarPath?: string;
}

export const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ className, testimonials, companyLogoPath = "", avatarPath = "", ...props }, ref) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
      if (!api) return;
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
      });
    }, [api]);

    return (
      <div ref={ref} className={cn("py-16", className)} {...props}>
        <Carousel
          setApi={setApi}
          className="max-w-screen-xl mx-auto px-4 lg:px-8"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.company}
                className="flex flex-col items-center cursor-grab"
              >
                {/* Removed company logo for now */}
                {/*
                <div className="mb-7 relative h-8 w-32">
                  <img
                    src={`${companyLogoPath}${testimonial.company}.svg`}
                    alt={`${testimonial.company} logo`}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </div>
                */}
                <p className="max-w-xl text-balance text-center text-xl sm:text-2xl text-foreground">
                  {testimonial.review}
                </p>
                <h5 className="mt-5 font-medium text-muted-foreground">
                  {testimonial.name}
                </h5>
                {/* Removed role as per user request */}
                {/*
                <h5 className="mt-1.5 font-medium text-foreground/40">
                  {testimonial.role}
                </h5>
                */}
                {/* Removed avatar as per user request */}
                {/*
                <div className="mt-5 relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img
                    src={`${avatarPath}${testimonial.avatar}`}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                */}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "size-1.5 rounded-full transition-all",
                  index === current ? "bg-primary" : "bg-primary/35"
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

TestimonialCarousel.displayName = "TestimonialCarousel"; 