import { useState } from "react";
import { login } from "../Utils/API";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setToken }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: userInfo.username,
      password: userInfo.password,
    };
    const response = await login(user);
    setToken(response.token);
    localStorage.setItem("token", response.token);
    navigate("/account");
  }
  return (
    <form
      className="component-div login text-textColor grid items-center text-center my-8 py-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl w-full">Login</h2>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          name="username"
          className="input w-2/4 m-4"
          value={userInfo.username}
          onChange={(e) => {
            setUserInfo((prev) => {
              return { ...prev, username: e.target.value };
            });
          }}
          required
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          className="input w-2/4 my-4"
          value={userInfo.password}
          onChange={(e) => {
            setUserInfo((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
          required
        />
      </label>
      <input className="my-6 btn" type="submit" value="Submit" />
    </form>
  );
}
