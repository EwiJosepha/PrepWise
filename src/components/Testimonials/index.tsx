import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";
import { TestimonialBottomSvg, TestimonialTopSvg } from "../svg-components/testimonial-svg";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Faith Ngani",
    designation: "Manager at Rebase",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free.",
    image: "/assets/images/missfaith.jpg",
    star: 5,
  },
  {
    id: 2,
    name: "Gmarvis Sam",
    designation: "Developer",
    content:
      "As a developer, I appreciate how intuitive and efficient this app is. It helps me during my interviews",
    image: "/assets/images/Gmarvis Sam.jpg",
    star: 5,
  },
  {
    id: 3,
    name: "Rash Lafeh",
    designation: "Developer",
    content:
      "This app has become an essential tool in my interview preps. Its accuracy and user-friendly interface help me to get set during interviews",
    image: "/assets/images/rash.jpg",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28 bg-indigo-800">
      <div className="container  px-20 xl:px-40">
        <SectionTitle
          title="What Our Users Say"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
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
