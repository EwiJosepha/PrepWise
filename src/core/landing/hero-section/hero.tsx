import Link from "next/link";
import HeroTopSVG from '@/components/svg-components/hero-top-svg'
import HeroSecBottomSVG from "@/components/svg-components/hero-sec-bottom-svg";

const Hero = () => {
  return (
    <>
      <section className="relative z-10 min-h-[800px] w-full flex items-center justify-center bg-secondary"
      >
        <div className=" md:p-8 p-4 rounded-md">
          <div className="flex flex-wrap">
            <div className="w-full md:px-4">
              <div className=" md:text-center">
                <h1
                  className="bg-gradient-to-r mb-6 lg:mb-10 from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                >
                  Elevate Your Career Trajectory!

                  <span className="sm:block mt-4"> Your Interview, Your Breakthrough. </span>
                </h1>
                <p className="text-center mb-6 text-base leading-relaxed text-white sm:text-lg md:text-xl"> Our platform is designed for <span className="font-bold text-yellow-300">job seekers and professionals</span> looking to enhance their interview skills. </p> <p className="text-center mb-6 text-base leading-relaxed text-white sm:text-lg md:text-xl"> This application allows users to <span className="italic text-green-300">copy job descriptions</span> and receive tailored preparation materials. </p> <p className="text-center mb-6 text-base leading-relaxed text-white sm:text-lg md:text-xl"> We provide <span className="underline text-blue-300">personalized interview questions</span> to help you prepare effectively. </p> <p className="text-center mb-12 text-base leading-relaxed text-white sm:text-lg md:text-xl"> Additionally, our platform offers <span className="font-semibold text-pink-300">expert resume feedback</span> to improve your chances of landing that dream job. </p>
                <div className="flex gap-4 md:gap-6 items-center justify-center space-y-4 sm:flex-row  sm:space-y-0  mb-6 md:mb-0">
                  <Link
                    href="/sign-up"
                    className="rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    🔥 Get Pro
                  </Link>
                  <Link
                    href="/sign-up"
                    className=" rounded-sm bg-indigo-500 px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="absolute right-0 top-0 z-[-1] opacity-30 ">
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
        </div> */}
      </section>
    </>
  );
};

export default Hero;

