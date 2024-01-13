import { Outlet, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import NuteContainer from "./components/NutrientCalc/NuteContainer";
import ExtraCalcs from "./components/ExtraCalcs/ExtraCalcs";
import About from "./components/About/About";
import ContactUs from "./components/About/ContactUs";
import PDF from "./components/PDF";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/NuteCalc/" element={<NuteContainer />} />
        <Route path="/ExtraCalcs/*" element={<ExtraCalcs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/pdf" element={<PDF />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
