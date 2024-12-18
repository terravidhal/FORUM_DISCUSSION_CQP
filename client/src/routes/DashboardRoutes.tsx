import { Route, Routes } from "react-router-dom";
import DashboardLayout from "@/views/dashboard/layout/DashboardLayout";
import CustomersPage from "@/views/dashboard/pages/CustomersPage";
import ProductsPage from "@/views/dashboard/pages/ProductsPage";
import FieldsPage from "@/views/dashboard/pages/FieldsPage/FieldsPage";
import DetailsFieldPage from "@/views/dashboard/pages/DetailsFieldPage/DetailsFieldPage";
import DetailsSessionPage from "@/views/dashboard/pages/DetailsSessionPage/DetailsSessionPage";
import SessionsPage from "@/views/dashboard/pages/SessionsPage/SessionsPage";
import StudentsPage from "@/views/dashboard/pages/StudentsPage/StudentsPage";
import { Chart } from "@/views/Chart/Chart";
import DashBoardHomePage from "@/views/dashboard/pages/DashBoardHomePage/DashBoardHomePage";
import TemplatePage from "@/views/dashboard/pages/TemplatePage/TemplatePage";


const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="" element={<DashBoardHomePage />} />
        <Route path="fields" element={<FieldsPage />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="statistics" element={<Chart />} />
        <Route path="templates" element={<TemplatePage />} />
        <Route path="fields/:idField" element={<DetailsFieldPage />} />
        <Route
          path="fields/:idField/session/:idSession"
          element={<DetailsSessionPage />}
        />
        <Route path="home" element={<ProductsPage />} />
        <Route path="customers" element={<CustomersPage />} />
      </Routes>
    </DashboardLayout>
  );
};
export default DashboardRoutes;
