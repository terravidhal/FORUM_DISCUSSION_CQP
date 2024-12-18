import { Routes, Route, Navigate } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
//import VerifiedCertifPage from "./views/VerifiedCertifPage/VerifiedCertifPage";
import VerifiedCertifPage2 from "./views/VerifiedCertifPage/VerifiedCertifPage2";
import HomePageRoutes from "./routes/HomePageRoutes";
import Error from "./views/Error/Error";
import { UseProtectedRoute } from "./hooks/ProtectedRoute ";
import ProfileUser from "./views/ProfileUser/ProfileUser";

const App = () => {
  const { ProtectedRoute } = UseProtectedRoute();

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home/*" element={<HomePageRoutes />} />
      <Route
        path="/verif/:CertifModel/:idStudentss"
        element={<VerifiedCertifPage2 />}
      />
      <Route path="/profile" element={<ProfileUser />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default App;
