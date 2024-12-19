import AboutSectionOne from "@/views/HomePage/components/About/AboutSectionOne";
import Accueil from "@/views/HomePage/pages/Accueil/Accueil";
import Contact from "@/views/HomePage/components/Contact";
import HomePageLayout from "@/views/HomePage/layout/HomePageLayout";
import { Route, Routes } from "react-router-dom";
import Signin from "@/views/HomePage/pages/Signin/Signin";


const HomePageRoutes = () => {
  return (
    <HomePageLayout>
      <Routes>
        <Route index element={<Accueil />} />
        <Route path="about" element={<AboutSectionOne />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signin" element={<Signin />} />
      </Routes>
    </HomePageLayout>
  );
};
export default HomePageRoutes;
