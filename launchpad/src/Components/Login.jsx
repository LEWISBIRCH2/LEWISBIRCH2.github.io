import { verifyUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await verifyUser(user);
    if (response) {
      localStorage.setItem("User", response);
      navigate("/home");
    } else {
      alert("Incorrect details submitted");
    }
  }

  return (
    <>
      <div className="loginContainer">
        <form onSubmit={handleSubmit} className="loginForm">
          <input
            placeholder={"Email"}
            onChange={handleChange}
            name="email"
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
          <button className="loginButton" type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
