import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";

export const PartnerTestimonialsSection = () => {
  const testimonials = [
    {
      company: "traviz",
      avatar: "https://randomuser.me/api/portraits/men/48.jpg",
      name: "Rajesh Kumar",
      role: "CEO, Traviz Idea",
      review: "Wonder Holidays has transformed our travel business. The platform's ease of use and extensive inventory have helped us serve our customers better than ever before."
    },
    {
      company: "modi-travels",
      avatar: "https://randomuser.me/api/portraits/women/75.jpg",
      name: "Ajay Modi",
      role: "Director, Modi Travels",
      review: "The real-time booking capabilities and competitive pricing have made Wonder Holidays our preferred B2B travel partner. Their support team is exceptional!"
    },
    {
      company: "hudels",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      name: "Priya Sharma",
      role: "Founder, Hudels Hospitality",
      review: "As a growing travel agency, Wonder Holidays has been instrumental in our success. Their platform's reliability and comprehensive features are unmatched."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-wonder-50 to-partner-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Leading Travel Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful travel businesses that have grown with Wonder Holidays
          </p>
        </div>
        
        <TestimonialCarousel
          testimonials={testimonials}
          companyLogoPath="/images/companies/"
          avatarPath=""
        />
      </div>
    </section>
  );
};

export default PartnerTestimonialsSection;
