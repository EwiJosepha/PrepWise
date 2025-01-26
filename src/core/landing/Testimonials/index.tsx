import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";
import { TestimonialBottomSvg, TestimonialTopSvg } from "@/components/svg-components/testimonial-svg";
import faith from "@/assets/images/missfaith.jpg"
import gmarvis from "@/assets/images/Gmarvis Sam.jpg"
import rash from "@/assets/images/rash.jpg"

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Faith Ngani",
    designation: "Manager at RCC",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free.",
    image: faith,
    star: 5,
  },
  {
    id: 2,
    name: "Gmarvis Sam",
    designation: "Developer",
    content:
      "As a developer, I appreciate how intuitive and efficient this app is. It helps me during my interviews",
    image: gmarvis,
    star: 5,
  },
  {
    id: 3,
    name: "Rash Lafeh",
    designation: "Developer",
    content:
      "As a developer, I appreciate how intuitive and efficient this app is. It helps me during my interviews",
    image: rash,
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28 bg-secondary">
      <div className="px-4 md:px-14  ls:px-40  container">
        <SectionTitle
          title="What Our Users Say"
          paragraph="Discover the transformation power of personalized learning with Prepwis@, where we help you get hired"
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((testimonial) => (
            <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-5 z-[-1]">
        <TestimonialBottomSvg />
      </div>
      <div className="absolute bottom-5 left-0 z-[-1]">
        <TestimonialTopSvg />
      </div>
    </section>
  );
};

export default Testimonials;
