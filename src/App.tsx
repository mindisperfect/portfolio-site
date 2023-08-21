import { BrowserRouter, Routes, Route } from "react-router-dom";

//user
import Home from "./pages/user/home/Home";
import About from "./pages/user/about/About";
import Contact from "./pages/user/contact/Contact";
import FrontLayout from "./components/layout/frontLayout/FrontLayout";
import Portfolio from "./pages/user/portfolio/Portfolio";
import NotFoundP from "./pages/NotFoundP";

//user admin
import AdminLayout from "./components/layout/adminLayout/AdminLayout";
import DashboardP from "./pages/adminUser/DashboardP";
import ExperiencesP from "./pages/adminUser/ExperiencesP";
import MessagesP from "./pages/adminUser/MessagesP";
import SkillsP from "./pages/adminUser/SkillsP";
import PortfolioP from "./pages/adminUser/PortfolioP";
import LoginP from "./pages/user/login/LoginP";
import Register from "./pages/user/register/Register";
import EducationP from "./pages/adminUser/EducationP";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoginP />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/" element={<AdminLayout />}>
         <Route path="dashboard" element={<DashboardP />} />
         <Route path="experiences" element={<ExperiencesP />} />
         <Route path="messages" element={<MessagesP />} />
         <Route path="portfolios" element={<PortfolioP />} />
         <Route path="skills" element={<SkillsP />} />
         <Route path="education" element={<EducationP />} />
        </Route>
        <Route path="*" element={<NotFoundP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
