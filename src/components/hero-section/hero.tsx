import Link from "next/link";
import HeroTopSVG from '../svg-components/hero-top-svg'
import HeroSecBottomSVG from "../svg-components/hero-sec-bottom-svg";

const Hero = () => {
  return (
    <>
      <section  className="relative z-10 min-h-[800px] flex items-center justify-center pb-16 pt-[120px]  bg-secondary  md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container bg-primary md:p-8 p-4">
          <div className="-mx-auto flex flex-wrap">
            <div className="w-full md:px-4">
              <div className="md:mx-auto md:max-w-[800px] md:text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-white  dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Prep  <span className="text-blue-500 font-bold">FreelyFor </span>Your Interview
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl text-white">
                  Our platform is a freePrep wise@ website designed for job seekers and professionals looking to enhance their interview skills. This application allows users to copy job descriptions and receive tailored preparation materials, including interview questions and resume feedback.

                </p>
                <div className="flex gap-4 md:gap-6 items-center justify-center space-y-4 sm:flex-row  sm:space-y-0  mb-6 md:mb-0">
                  <Link
                    href="/sign-up"
                    className="rounded-sm bg-secondary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    🔥 Get Pro
                  </Link>
                  <Link
                    href="/sign-up"
                    className=" rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 z-[-1] opacity-30 ">
          <HeroTopSVG />
        </div>
        <div className="absolute left-0 top-0 z-[-1] opacity-30 ">
          <HeroTopSVG />
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 ">
          <HeroSecBottomSVG />
        </div>
        <div className="absolute bottom-0 right-0 z-[-1] opacity-30">
          <HeroSecBottomSVG />
        </div>
      </section>
    </>
  );
};

export default Hero;

