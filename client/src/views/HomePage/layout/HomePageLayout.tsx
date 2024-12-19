import { ThemeContext } from "@/main";
import { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import "./HomePage.css";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`bg-[#FCFCFC]  dark:bg-black ${theme}`}>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
