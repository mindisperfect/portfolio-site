import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/user/home/Home";
import About from "./pages/user/about/About";
import Portfolio from "./pages/user/portfolio/Portfolio";
import Contact from "./pages/user/contact/Contact";
import FrontLayout from "./components/layout/frontLayout/FrontLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
