import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Nav, Footer } from "../Home";
import BackToTop from "./BackToTop";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
