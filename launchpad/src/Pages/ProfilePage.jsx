import { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";

export function ProfilePage() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function loadUserData() {
      const token = localStorage.getItem("User");
      const decodedUser = jwt_decode.jwtDecode(token);
      setUser(decodedUser);
    }
    loadUserData();
  }, []);

  return (
    <>
      <label>Name:</label>
      <h2>{user.name}</h2>
      <label>Email:</label>
      <h2>{user.email}</h2>
      <h1>-----------------</h1>
      <br></br>
      <label>Personal Exhibit:</label>
    </>
  );
}
