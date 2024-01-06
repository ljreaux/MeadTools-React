import ExtraCalcs from "./components/ExtraCalcs/ExtraCalcs";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import { Outlet, Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import NuteContainer from "./components/NutrientCalc/NuteContainer";
import ContactUs from "./components/About/ContactUs";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/NuteCalc/" element={<NuteContainer />} />
        <Route path="/ExtraCalcs/*" element={<ExtraCalcs />}>
          {" "}
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />}></Route>
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
