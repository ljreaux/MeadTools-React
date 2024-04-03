import { useEffect, useState } from "react";
import { getUserInfo } from "../Utils/API";
import { useNavigate } from "react-router-dom";

export default function Account({ token }) {
  const [userInfo, setUserInfo] = useState({
    recipes: [],
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/");
    async function getUser() {
      const user = await getUserInfo(token);
      setUserInfo(user);
    }
    getUser();
  }, [token]);

  return (
    <div className="grid place-items-center text-center box-border ">
      <div className="component-div text-textColor p-8 mt-[2rem]">
        <h1 className="text-4xl">Account</h1>
        <p className="text-xl">Username: {userInfo.username}</p>
        <p className="text-xl">First Name: {userInfo.first_name}</p>
        <p className="text-xl">Last Name: {userInfo.last_name}</p>
        <p className="text-xl">Email: {userInfo.email}</p>
        <h2 className="text-3xl mt-4 w-full">Recipes: </h2>
        <ol className="grid grid-cols-4 ">
          {userInfo.recipes.map((recipe, i) => (
            <li key={recipe.name} className="grid items-center m-4">
              {recipe.name}
              <button
                className="btn"
                onClick={() => navigate(`/recipePage/${recipe.id}`)}
              >
                See Recipe
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
