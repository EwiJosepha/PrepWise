"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  useEffect, useState } from "react";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  const usePathName = usePathname();

  return (
    <>
      <header
        className={`bg-blue w-screen sticky top-0 left-0
             right-0 z-40 shadow-lg bg-primary`}
      >
        <div className="max-w-7xl  justify-between px-4 mx-auto items-center flex h-16 md:h-24">
            <div className="flex items-center justify-between py-3 md:py-5 md:block max-w-full">
              <Link
                href="/"
                className={` block w-full ${sticky ? "py-5 lg:py-2" : "py-1"
                  } `}
              >
                <p className="font-bold  md:text-2xl text-indigo-500">Prep Wise@</p>
              </Link>
            </div>
            <div className="flex">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-white focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[7px]rotate-45" : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${navbarOpen ? "opacity-0 " : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                      }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-indigo-900 px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                    }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => {
                      return (
                        <li key={index} className="group relative">
                          {menuItem.path ? (
                            <Link
                              href={menuItem.path}
                              className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${usePathName === menuItem.path
                                  ? "text-primary dark:text-white"
                                  : "text-white hover:text-primary"
                                }`}
                            >
                              {menuItem.title}
                            </Link>
                          ) : null}
                        </li>
                      );
                    })}

                  </ul>
                </nav>
              </div>
              <div className="flex items-center md:justify-end md:pr-16 pl-8 md:pl-0 lg:pr-0">
                <Link
                  href="/sign-in"
                  className="hidden px-4 py-3 m:px-7 text-base font-medium text-dark hover:opacity-70 text-white dark:text-white md:block"
                >
                  Sign In
                </Link>
                <div className="inline-block  rounded-sm bg-indigo-500 px-4 py-1 m:px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-indigo-950 dark:bg-white/10 dark:text-white dark:hover:bg-white/5">
                <Link
                  href="/sign-up"
                  className=" px-4 py-[12px] top-[40px] m:px-7 text-base font-medium text-dark hover:opacity-70 text-white dark:text-white md:block md:font-bold"
                >
                  Sign Up
                </Link>
                </div>
             
                <div>
                </div>
              </div>
            </div>
          {/* </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
