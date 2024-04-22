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
import { useTranslation } from "react-i18next";
import Login from "./components/Account/Login";
import Account from "./components/Account/Account";
import useLocalStorage from "./hooks/useLocalStorage";
import useChangeLogger from "./hooks/useChangeLogger";
import useAbv from "./hooks/useAbv";
import Recipes from "./components/Recipes/Recipes";

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
  const { i18n } = useTranslation();
  const language = i18n.language;
  const [isMetric, setIsMetric] = useLocalStorage("metric", false);
  const [theme, setTheme] = useLocalStorage("theme", true);

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
  useChangeLogger(language);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [user, setUser] = useLocalStorage<{
    id: number;
    role: "user" | "admin";
  } | null>("user", null);

  const [opened, setOpened] = useState({
    menu: false,
    calcs: false,
    extraCalcs: false,
    account: false,
    links: false,
    settings: false,
  });

  const { ABV } = useAbv({ OG: recipeData.OG, FG: recipeData.FG });

  useEffect(() => {
    setRecipeData((prev) => ({ ...prev, ABV }));
  }, [ABV]);

  useEffect(() => {
    const body = document.querySelector("body");
    body?.setAttribute("data-theme", theme ? "dark" : "light");
  }, [theme]);

  useEffect(() => {
    setRecipeData((prev) => ({
      ...prev,
      units: {
        weight: isMetric ? "kg" : "lbs",
        volume: isMetric ? "liter" : "gal",
      },
    }));
  }, [isMetric]);
  useChangeLogger(opened);
  const toggleSettings = () => {
    setOpened((prev: Opened) => {
      console.log(!prev.settings);
      return {
        ...prev,
        settings: !prev.settings,
      };
    });
  };
  return (
    <div className="grid">
      <Navbar
        token={token}
        setToken={setToken}
        setUser={setUser}
        opened={opened}
        setOpened={setOpened}
        theme={theme}
        setTheme={setTheme}
      />
      <main
        className="flex items-center justify-center w-full min-h-[100vh]"
        onClick={() =>
          setOpened((prev: Opened) => ({
            ...prev,
            menu: false,
            settings: false,
          }))
        }
      >
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
              />
            }
          />
          <Route path="/NuteCalc" element={<NutrientCalc />} />
          <Route path="/ExtraCalcs/*" element={<ExtraCalcs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/login"
            element={<Login setToken={setToken} theme={theme} />}
          />
          <Route
            path="/account"
            element={
              <Account
                token={token}
                setToken={setToken}
                setUser={setUser}
                user={user}
                isDarkTheme={theme}
                setTheme={setTheme}
                isMetric={isMetric}
                setIsMetric={setIsMetric}
              />
            }
          />
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
        </Routes>
        <BottomBar />
      </main>
    </div>
  );
}

export default App;
