"use client";
import Header from "@/core/landing/header";
import { usePathname } from "next/navigation";

const HeaderWrapper = () => {
  const pathname = usePathname();

  const landingPageRoutes = ["/", "/home", "/about", "/contact"];
  const showHeader = landingPageRoutes.includes(pathname);

  return showHeader ? <Header /> : null;
};

export default HeaderWrapper;
