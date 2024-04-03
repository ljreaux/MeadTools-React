import { useState } from "react";
import { registerUser } from "../Utils/API";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setToken }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await registerUser(userInfo);
    setToken(response.token);
    localStorage.setItem(...response.token);
    navigate("/account");
  }
  return (
    <form
      className="component-div register text-textColor grid items-center text-center mb-8 py-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl w-full">Register</h2>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          name="username"
          id="username"
          className="input w-2/4 m-4"
          value={userInfo.username}
          onChange={(e) => {
            setUserInfo({ ...userInfo, username: e.target.value });
          }}
          required
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          className="input w-2/4 m-4"
          value={userInfo.email}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
          required
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          className="input w-2/4 m-4"
          value={userInfo.password}
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
          required
        />
      </label>
      <label htmlFor="firstName">
        First Name:
        <input
          type="text"
          name="firstName"
          id="firstName"
          className="input w-2/4 m-4"
          value={userInfo.firstName}
          onChange={(e) => {
            setUserInfo({ ...userInfo, firstName: e.target.value });
          }}
        />
      </label>
      <label htmlFor="lastName">
        Last Name:
        <input
          type="text"
          name="lastName"
          id="lastName"
          className="input w-2/4 m-4"
          value={userInfo.lastName}
          onChange={(e) => {
            setUserInfo({ ...userInfo, lastName: e.target.value });
          }}
        />
      </label>
      <input className="my-6 btn" type="submit" value="Submit" />
    </form>
  );
}
