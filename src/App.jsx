import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage';
import Layout from "./Components/LandingPage/LandingPageLayout/Layout";
import AboutPage from "./Components/LandingPageComponents/AboutPage";
import ContactPage from "./Components/LandingPageComponents/ContactPage";
import Courses from "./Components/LandingPageComponents/Courses";
import Blogs from "./Components/LandingPageComponents/Blogs";
import AuthPage from "./Components/Auth/UserAuthPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="Blogs" element={<Blogs />} />
          <Route path="auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
