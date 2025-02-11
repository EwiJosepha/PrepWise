"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-tetiary text-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24 px-4">
    {/* Main Footer Content */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="md:mb-12 max-w-[360px] lg:mb-16">
        <Link href="/" className="mb-8 inline-block text-indigo-500 font-bold">
          PrepWise@
        </Link>
        <p className="md:mb-9 mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
          Prepare accurately for your interviews
        </p>
        <div className="flex items-center">
          <a
            href="/"
            aria-label="social-link"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
          >
            {/* Social Media Icon */}
          </a>
        </div>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="md:mb-12 mb-4 lg:mb-16">
          <h2 className="mb-10 text-xl font-bold text-white dark:text-white">
            Useful Links
          </h2>
          <ul>
            <li>
              <Link
                href="/blog"
                className="md:mb-4 mb-1 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="md:mb-4 mb-1  inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
  
        <div className="md:mb-12 mb-4 lg:mb-16">
          <h2 className="md:mb-10 mb-4 text-xl font-bold text-white">
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
                className="mb-4 inline-block text-base text-white duration-300 hover:text-primary dark:hover:text-primary"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="md:mb-4 inline-block text-base text-body-color duration-300 hover:text-primary text-white dark:hover:text-primary"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
  
        <div className="md:mb-12 mb-4 lg:mb-16 flex flex-col justify-end">
          <h2 className="mb-10 text-xl font-bold text-white">
            Support & Help
          </h2>
          <ul>
            <li>
              <Link
                href="/contact"
                className="md:mb-4 inline-block text-base text-body-color duration-300 hover:text-primary"
              >
                Open Support Ticket
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="md:mb-4 inline-block text-base text-white duration-300 hover:text-primary"
              >
                Terms of Use
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="md:mb-4 inline-block text-base text-body-color duration-300 hover:text-primary"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  
    {/* Horizontal Line */}
    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183] mt-8"></div>
  
    {/* Footer Bottom */}
    <div className="container mx-auto flex justify-center py-8">
      <p className="text-center text-[16px] text-slate-gray">
        ©2025 ALL RIGHTS RESERVED PrepWise@
      </p>
    </div>
  </footer>
  
  );
};

export default Footer;
