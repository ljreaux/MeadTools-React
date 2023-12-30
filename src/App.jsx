import ExtraCalcs from "./components/ExtraCalcs/ExtraCalcs";
import NutrientCalc from "./components/NutrientCalc/NutrientCalc";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import { Outlet, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/NuteCalc/" element={<NutrientCalc />} />
        <Route path="/ExtraCalcs/*" element={<ExtraCalcs />}>
          {" "}
        </Route>
        <Route path="/documentation" />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
