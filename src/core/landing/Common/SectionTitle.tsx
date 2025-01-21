const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "100px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`w-full md:mb-[100px] mb-8 ${center ? "mx-auto text-center"  : ""}`}
        style={{ maxWidth: width }}
      >
        <h2 className="mb-4   text-3xl font-bold !leading-tight text-white dark:text-white sm:text-4xl md:text-[45px]">
          {title}
        </h2>
        <p className="text-base px-6 md:px-6 !leading-relaxed   md:text-lg text-white">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
