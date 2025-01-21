import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28 bg-secondary text-white">
        <div className=" flex flex-col items-center">
          <SectionTitle
            title="Main Features"
            paragraph="Prep wise@ provides features such as resume review, accurate response, speedy response..."
            center
          />

          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 px-4 md:px-14  lg:px-14 md:gap-16">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
