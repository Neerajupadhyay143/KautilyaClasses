import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage';
import Layout from "./Components/LandingPage/LandingPageLayout/Layout";
import AboutPage from "./Components/LandingPageComponents/AboutPage";
import ContactPage from "./Components/LandingPageComponents/ContactPage";
import Courses from "./Components/LandingPageComponents/Courses";
import Blogs from "./Components/LandingPageComponents/Blogs";
import AuthPage from "./Components/Auth/UserAuthPage";

import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import ManageCourses from "./admin/ManageCourses";
import ManageBlogs from "./admin/ManageBlogs";
import AdminLayout from "./admin/AdminLayout";

import AdminProtected from "./admin/AdminProtected";

import { SnackbarProvider } from "notistack";
import { useAuth } from "./context/AuthContext";
import CenterLoader from "./Components/Loader/CenterLoader";
import PrivacyPolicy from "./Components/LandingPageComponents/PrivacyPolicy";
import TermsAndConditions from "./Components/LandingPageComponents/TermsAndConditions";

function App() {
  const { loading } = useAuth();   // 🔥 yaha useAuth safe hai kyuki SnackbarProvider wrapper ke andar hoga

  return (
    <>
      {loading && <CenterLoader />}
      {/* Loader globally work karega */}

      <BrowserRouter>
        <Routes>

          {/* USER WEBSITE ROUTES */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="courses" element={<Courses />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsAndConditions />} />

            {/*terms  */}
          </Route>

          {/* ADMIN LOGIN */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* PROTECTED ADMIN PANEL */}
          <Route
            path="/admin-panel"
            element={
              <AdminProtected>
                <AdminLayout />
              </AdminProtected>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="blogs" element={<ManageBlogs />} />
          </Route>

        </Routes>
      </BrowserRouter>


    </>

  );
}

export default App;
