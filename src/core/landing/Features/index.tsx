import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28 text-white">
        <div className=" flex flex-col items-center">
          <SectionTitle
            title="Main Features"
            paragraph="Prep wise@ provides features such as resume review, accurate response, speedy response..."
            center
          />

          <div className="xl:w-[50%] w-full">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 px-4 md:gap-4">
              {featuresData.map((feature) => (
                <SingleFeature key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
