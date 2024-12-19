import { Routes, Route, Navigate } from "react-router-dom";
import HomePageRoutes from "./routes/HomePageRoutes";
import Error from "./views/Error/Error";
import { UseProtectedRoute } from "./hooks/ProtectedRoute ";
import ProfileUser from "./views/ProfileUser/ProfileUser";
import ForumHomePage from "./views/ForumHomePage/ForumHomePage";

const App = () => {
  const { ProtectedRoute } = UseProtectedRoute();

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home/*" element={<HomePageRoutes />} />

      <Route path="/profile" element={<ProfileUser />} />

      <Route
        path="/homeForum"
        element={
          <ProtectedRoute>
            <ForumHomePage />
          </ProtectedRoute>
        }
      />

      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default App;
