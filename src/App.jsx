import { Outlet, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navs/Navbar";
import Home from "./components/Home/Home";
import NuteContainer from "./components/NutrientCalc/NuteContainer";
import ExtraCalcs from "./components/ExtraCalcs/ExtraCalcs";
import About from "./components/About/About";
import ContactUs from "./components/About/ContactUs";
import PDF from "./components/PDF/PDF";
import BottomBar from "./components/Navs/BottomBar";
import Account from "./components/Account/Account";
import Login from "./components/Account/Login";
import Recipes from "./components/Utils/Recipes";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [opened, setOpened] = useState({
    menu: false,
    calcs: false,
    extraCalcs: false,
    account: false,
    links: false,
  });
  return (
    <>
      <Navbar
        token={token}
        setToken={setToken}
        opened={opened}
        setOpened={setOpened}
      />
      <div onClick={() => setOpened((prev) => ({ ...prev, menu: false }))}>
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/NuteCalc/" element={<NuteContainer />} />
          <Route path="/ExtraCalcs/*" element={<ExtraCalcs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pdf" element={<PDF />} />
          <Route path="/login/*" element={<Login setToken={setToken} />} />
          <Route
            path="/Account"
            element={<Account setToken={setToken} token={token} />}
          />
          <Route
            path="/recipePage/:recipeId"
            element={<Recipes token={token} />}
          />
          <Route path="/recipe/:recipeId" element={<Home token={token} />} />
        </Routes>
      </div>
      <BottomBar />
      <Outlet />
    </>
  );
}

export default App;
