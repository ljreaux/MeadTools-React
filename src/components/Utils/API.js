const API_URL = "http://localhost:3000/api";

export async function getAllIngredients() {
  const response = await fetch(`${API_URL}/ingredients`);
  const data = await response.json();
  return data;
}

export async function getYeastsByBrand(brand) {
  const response = await fetch(`${API_URL}/yeasts/brand/${brand}`);
  const data = await response.json();
  return data;
}

export async function getAllYeasts() {
  const response = await fetch(`${API_URL}/yeasts`);
  const data = await response.json();
  return data;
}

export async function login(obj) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await response.json();
  return data;
}

export async function registerUser(obj) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await response.json();
  return data;
}

export async function getUserInfo(token) {
  const response = await fetch(`${API_URL}/users/accountInfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getRecipeById(id, token) {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.json();
  return data;
}

export async function createRecipe(token, recipe) {
  const response = await fetch(`${API_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipe),
  });
  const data = await response.json();
  return data;
}

export function setLocalStorage(recipe) {
  const {
    ingredients: storedInput,
    extra_ingredients: extraIngredients,
    num_of_additions: numOfAdditions,
    nute_schedule: nuteSchedule,
    row_count: rowCount,
    submitted,
    units,
    vol_units: volUnits,
    yeast_brand: yeastBrand,
    yeast_info: yeastInfo,
  } = recipe;
  const sessionData = {
    storedInput: JSON.parse(storedInput),
    extraIngredients: JSON.parse(extraIngredients),
    numOfAdditions,
    nuteSchedule,
    rowCount,
    submitted,
    units,
    volUnits,
    yeastBrand,
    yeastInfo: JSON.parse(yeastInfo),
  };
  for (let key in sessionData) {
    sessionStorage.setItem(key, JSON.stringify(sessionData[key]));
  }
}
