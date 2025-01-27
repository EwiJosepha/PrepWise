import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full shadow-lg bg-tetiary rounded-lg p-6 transition-transform duration-300 transform hover:-translate-y-2">
    <div className="wow fadeInUp" data-wow-delay=".15s">
      <div className="mb-4 mt-6 md:mb-10 md:mt-6 flex h-[50px] w-[50px] items-center justify-center rounded-md bg-white bg-opacity-10 text-white">
        {icon}
      </div>
      <h3 className="mb-5 text-xl font-bold text-white dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
        {title}
      </h3>
      <p className="pr-[10px] text-sm font-medium leading-relaxed text-body-color">
        {paragraph}
      </p>
    </div>
  </div>
  
  );
};

export default SingleFeature;
