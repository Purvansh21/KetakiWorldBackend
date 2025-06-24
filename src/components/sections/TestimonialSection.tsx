import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "MyPartnerKetakiWorld has transformed how we manage business travel. The platform is intuitive, the support is exceptional, and we've seen significant cost savings.",
      author: "Sarah Johnson",
      position: "Travel Manager",
      company: "Global Tech Solutions",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5
    },
    {
      quote: "The analytics and reporting features have given us unprecedented visibility into our travel spend. We've been able to optimize our policies and reduce costs by 28%.",
      author: "Michael Chen",
      position: "CFO",
      company: "InnovateTech",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      quote: "Our team members love the mobile app and the 24/7 support. Even when flights are canceled, MyPartnerKetakiWorld ensures our travelers are taken care of immediately.",
      author: "Priya Patel",
      position: "HR Director",
      company: "Nexus Enterprises",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Partners Are <span className="gradient-text">Saying</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how businesses are transforming their travel management with MyPartnerKetakiWorld.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="wonder-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex flex-col items-center">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <div className="flex mb-2">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-center">
                  <p className="font-semibold">{testimonials[currentIndex].author}</p>
                  <p className="text-sm text-gray-600">{testimonials[currentIndex].position}</p>
                  <p className="text-sm text-gray-600">{testimonials[currentIndex].company}</p>
                </div>
              </div>
              <div className="md:w-2/3 flex flex-col justify-center">
                <svg className="h-12 w-12 text-wonder-200 mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-xl italic mb-4">{testimonials[currentIndex].quote}</p>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-wonder-50 text-gray-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === currentIndex ? "bg-wonder-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-wonder-50 text-gray-600 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
