import { ArtCard } from "../Components/ArtCard";
import { useState, useEffect } from "react";
import { getGalleries } from "../api";
import * as jwt_decode from "jwt-decode";

export function ProfilePage() {
  const [art, setArt] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function loadUserData() {
      const token = localStorage.getItem("User");
      const decodedUser = jwt_decode.jwtDecode(token);
      const allArt = await getGalleries();

      // Favourited artwork? Saved by filer? Add art to personal exhib on backend. Filter from all art into just personal exhib.
      // const filteredArt = allArt.filter((art) => {
      //   art.liked == decodedUser._id;
      // });
      // setArt(filteredArt);
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
      <label>Join Date:</label>
      <h2>{Date(user.joinDate).slice(0,16)}</h2>
      {art.map((art) => {
        return <ArtCard art={art} />;
      })}
    </>
  );
}
