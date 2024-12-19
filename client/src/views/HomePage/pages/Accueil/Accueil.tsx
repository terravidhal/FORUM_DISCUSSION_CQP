import AboutSectionOne from "../../components/About/AboutSectionOne";
import AboutSectionTwo from "../../components/About/AboutSectionTwo";
import Brands from "../../components/Brands";
import ScrollUp from "../../components/Common/ScrollUp";
import Contact from "../../components/Contact";
import Features from "../../components/Features";
import Hero from "../../components/Hero";
import Testimonials from "../../components/Testimonials";

const Accueil = () => {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Accueil;
