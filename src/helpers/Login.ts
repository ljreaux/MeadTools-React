import { API_URL } from "../main";

export async function login(obj: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await response.json();
  return {
    token: data.accessToken,
    refreshToken: data.refreshToken,
    message: data.message,
  };
}

export async function register(obj: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await response.json();
  return {
    token: data.accessToken,
    refreshToken: data.refreshToken,
    message: data.message,
  };
}

export async function getUserInfo(token: string) {
  let response = await fetch(`${API_URL}/users/accountInfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await response.json();


  if (data.message === "jwt expired") {
    const reToken = localStorage.getItem("refreshToken");
    if (!reToken) return null;
    const user = localStorage.getItem("user") || "";
    const email = JSON.parse(user).email;

    let newToken;
    if (email && reToken) {
      newToken = await refreshToken(reToken, email);
    }

    if (newToken) {
      const { accessToken } = newToken;
      localStorage.setItem("token", accessToken);
      localStorage.removeItem("refreshToken");
      response = await fetch(`${API_URL}/users/accountInfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      data = await response.json();
    }

  }
  if (data.message === "jwt malformed") return null;

  return data;
}

export async function getRecipeById(id: number, token: string) {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.json();
  return data;
}

const refreshToken = async (refreshToken: string, email: string) => {
  const response = await fetch(`${API_URL}/users/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken, email }),
  });
  const data = await response.json();
  return data;
};
