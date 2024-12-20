import ExtraCalcs from "./components/ExtraCalculators/ExtraCalcs";
import { useEffect, useState } from "react";
import Navbar from "./components/Navs/Navbar";
import { Route, Routes } from "react-router-dom";
import BottomBar from "./components/Navs/BottomBar";
import About from "./components/About/About";
import ContactUs from "./components/About/ContactUs";
import NutrientCalc from "./components/Nutrients/NutrientCalc";
import Home from "./components/Home/Home";
import { initialIngredients } from "./components/Home/initialIngredients";
import { IngredientListItem } from "./components/Home/Ingredient";
import Login from "./components/Account/Login";
import Account from "./components/Account/Account";
import useLocalStorage from "./hooks/useLocalStorage";
// import useAbv from "./hooks/useAbv";
import Recipes from "./components/Recipes/Recipes";
import Juice from "./components/Juice/Juice";
import SupportDialog from "./components/SupportDialog";
import DesktopDownload from "./components/DesktopDownload";
import ISpindelDashboard from "./components/Account/iSpindel/Routes";
import Stabilizers from "./components/Stabilizers/Stabilizers";
import DesktopDialog from "./components/DesktopDialog";

export interface Additive {
  name: string;
  amount: number;
  unit: string;
}

export interface Ingredient {
  name: string;
  brix: number;
  details: number[];
  secondary: boolean;
  category: string;
}

export type List = IngredientListItem[];

export interface RecipeData {
  ingredients: Ingredient[];
  OG: number;
  volume: number;
  ABV: number;
  FG: number;
  offset: number;
  units: {
    weight: "lbs" | "kg";
    volume: "gal" | "liter";
  };
  sorbate?: number;
  sulfite?: number;
  campden?: number;
  additives: Additive[];
}

export type Opened = {
  menu: boolean;
  calcs: boolean;
  extraCalcs: boolean;
  account: boolean;
  links: boolean;
  settings: boolean;
};

function App() {
  const [isMetric, setIsMetric] = useLocalStorage("metric", false);

  const [ingredientsList, setIngredientsList] = useState<List>([]);
  const [recipeData, setRecipeData] = useLocalStorage<RecipeData>(
    "recipeData",
    {
      ingredients: initialIngredients,
      OG: 0,
      volume: 0,
      ABV: 0,
      FG: 0.996,
      offset: 0,
      units: {
        weight: isMetric ? "kg" : "lbs",
        volume: isMetric ? "liter" : "gal",
      },
      additives: [{ name: "", amount: 0, unit: "g" }],
    }
  );

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [user, setUser] = useLocalStorage<{
    id: number;
    role: "user" | "admin";
    email: string;
  } | null>("user", null);

  const [, setBlendSG] = useState([0.996, 0.996]);

  useEffect(() => {
    setRecipeData((prev) => ({
      ...prev,
      units: {
        weight: isMetric ? "kg" : "lbs",
        volume: isMetric ? "liter" : "gal",
      },
    }));
  }, [isMetric]);

  return (
    <>
      <Navbar token={token} setToken={setToken} setUser={setUser} />
      <main className="flex items-center justify-center w-full min-h-[100vh] bg-secondary">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                recipeData={recipeData}
                setRecipeData={setRecipeData}
                ingredientsList={ingredientsList}
                setIngredientsList={setIngredientsList}
                token={token}
                setBlendFG={setBlendSG}
              />
            }
          />
          <Route path="/NuteCalc" element={<NutrientCalc />} />
          <Route path="/stabilizers" element={<Stabilizers />} />
          <Route path="/ExtraCalcs/*" element={<ExtraCalcs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/account/"
            element={
              <Account
                token={token}
                setToken={setToken}
                setUser={setUser}
                user={user}
                isMetric={isMetric}
                setIsMetric={setIsMetric}
              />
            }
          />
          <Route path="/account/ispindel/*" element={<ISpindelDashboard />} />
          <Route
            path="/recipes/:recipeId"
            element={
              <Recipes
                ingredientsList={ingredientsList}
                setIngredientsList={setIngredientsList}
                token={token}
                userId={user?.id || null}
              />
            }
          />
          <Route path="/juice" element={<Juice />} />
          <Route path="/desktop" element={<DesktopDownload />} />
        </Routes>
        <BottomBar />
        <DesktopDialog />
        <SupportDialog />
      </main>
    </>
  );
}

export default App;
