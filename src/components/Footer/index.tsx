"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-indigo-950 text-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24 px-8 md:px-20">
  <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="mb-12 max-w-[360px] lg:mb-16">
      <Link href="/" className="mb-8 inline-block text-indigo-500 font-bold">
        Prep wise@
      </Link>
      <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
        prepare accurately for your interviews
      </p>
      <div className="flex items-center">
        <a
          href="/"
          aria-label="social-link"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
        >
          {/* SVG Icon */}
        </a>
        {/* Repeat for other social icons */}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="mb-12 lg:mb-16">
        <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
          Useful Links
        </h2>
        <ul>
          <li>
            <Link
              href="/blog"
              className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
            >
              About
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-12 lg:mb-16">
        <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
          Terms
        </h2>
        <ul>
          <li>
            <Link
              href="/"
              className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
            >
              TOS
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
            >
              Refund Policy
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-12 lg:mb-16 flex flex-col justify-end">
        <h2 className="mb-10 text-xl font-bold text-black dark:text-white ">
          Support & Help
        </h2>
        <ul>
          <li>
            <Link
              href="/contact"
              className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
            >
              Open Support Ticket
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
            >
              Terms of Use
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
  <div className="py-8" />
  
  <div className="absolute bottom-24 flex flex-col items-center z-[-1]">
    <p className='text-center text-[16px] text-slate-gray xl:pt-4 '>
      ©2025 ALL RIGHTS RESERVED PrepWise@
    </p>
  </div>
</footer>
  );
};

export default Footer;
