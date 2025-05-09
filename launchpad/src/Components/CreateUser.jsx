import { createUser } from "../api";
import { useState } from "react";

export function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await createUser(user);
    if (response.status !== 200) {
      alert("User account could not be created");
    } else {
      alert("Account successfully created!");
      window.location.reload();
    }
  }

  return (
    <>
      <div className="newAccountContainer">
        <form className="signUpForm" onSubmit={handleSubmit}>
          <input
            placeholder={"Name"}
            onChange={handleChange}
            name="name"
            required
            maxLength={20}
          />
          <input
            placeholder={"Email"}
            onChange={handleChange}
            name="email"
            type="email"
            required
            maxLength={40}
          />
          <input
            placeholder={"Password"}
            onChange={handleChange}
            name="password"
            required
            maxLength={20}
            type="password"
          />
          <button className="createAccountButton" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
