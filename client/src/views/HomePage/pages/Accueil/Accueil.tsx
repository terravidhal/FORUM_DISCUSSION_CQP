import AboutSectionOne from "../About/AboutSectionOne";
import AboutSectionTwo from "../About/AboutSectionTwo";
import Brands from "../Brands";
import ScrollUp from "../Common/ScrollUp";
import Contact from "../Contact";
import Features from "../Features";
import Hero from "../Hero";
import Testimonials from "../Testimonials";

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
