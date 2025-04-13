import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SeeArtwork } from "./Pages/SeeArtworkPage";
import { PersonalExhibit } from "./Pages/PersonalExhibitPage";
import { LandingPage } from "./Pages/LandingPage";
import { AboutPage } from "./Pages/AboutPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { HomePage } from "./Pages/HomePage";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Layout } from "./Components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  getGalleries,
  getGallery,
  updateGallery,
  deleteGallery,
  createGallery,
} from "./api";

function App() {
  // const [gallery, setGallery] = useState();

  // useEffect(() => {
  //   async function allGallery() {
  //     let data = await getGalleries();
  //     if (data) {
  //       setGallery(data);
  //     }
  //   }
  //   allGallery();
  // }, []);

  // function createGalleryPost() {
  //   let galleryObject = {
  //     museum: "testPost WITH API",
  //     title: "postedTitle",
  //     description: "A hardcoded post",
  //   };
  //   createGallery(galleryObject);
  // }

  // <>{JSON.stringify(gallery)}</>;
  //  <button onclick={createGalleryPost()}>Create Entry</button>

  // useEffect(() => {
  //   const stored = sessionStorage.getItem("User");
  //   if (stored) {
  //     try {
  //       const parsed = JSON.parse(stored);
  //       const token = typeof parsed === "string" ? parsed : parsed.token;
  //       if (token) {
  //         axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  //       }
  //     } catch (err) {
  //       console.error("Invalid token format in sessionStorage", err);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const stored = localStorage.getItem("User");
    console.log("APP.JSX — LocalStorage Token:", stored);

    if (stored) {
      try {
        const token = stored;
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      } catch (err) {
        console.error("Failed to parse stored token:");
      }
    }
  }, []);

  // useEffect(() => {
  //   let token = sessionStorage.getItem("User");
  //   console.log("APP.JSX L48", "TOKEN", token);
  //   if (token) {
  //     axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  //   }
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/gallery/:id" element={<SeeArtwork />} />
          <Route path="/personalexhibit" element={<PersonalExhibit />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// npm start
