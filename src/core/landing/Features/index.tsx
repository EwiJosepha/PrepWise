import HeroTopSVG from "@/components/svg-components/hero-top-svg";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import HeroSecBottomSVG from "@/components/svg-components/hero-sec-bottom-svg";

const Features = () => {
  return (
    <>
      <section id="features" className=" relative py-16 md:py-20 lg:py-28 text-white bg-secondary">
        <div className=" flex flex-col items-center">
          <SectionTitle
            title="Main Features"
            paragraph="Prep wise@ provides features such as resume review, accurate response, speedy response..."
            center
          />

          <div className="max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 md:gap-4 lg:gap-10 ">
              {featuresData.map((feature) => (
                <SingleFeature key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0">
          <HeroSecBottomSVG />
        </div>
        <div className="absolute Top-0 left-0">
          <HeroSecBottomSVG />
        </div>
      </section>
    </>
  );
};

export default Features;
