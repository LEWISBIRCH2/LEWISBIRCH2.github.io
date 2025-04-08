import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SeeArtwork } from "./Pages/SeeArtworkPage";
import { PersonalExhibit } from "./Pages/PersonalExhibitPage";
import { LandingPage } from "./Pages/LandingPage";
import { AboutPage } from "./Pages/AboutPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { HomePage } from "./Pages/HomePage";
import { ContactPage } from "./Pages/ContactPage";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Layout } from "./Components/Layout";

import { useState, useEffect } from "react";
import {
  getGalleries,
  getGallery,
  updateGallery,
  deleteGallery,
  createGallery,
} from "./api";

function App() {
  const [gallery, setGallery] = useState();

  useEffect(() => {
    async function allGallery() {
      let data = await getGalleries();
      if (data) {
        setGallery(data);
      }
    }
    allGallery();
  }, []);

  function createGalleryPost() {
    let galleryObject = {
      museum: "testPost WITH API",
      title: "postedTitle",
      description: "A hardcoded post",
    };
    createGallery(galleryObject);
  }

  // <>{JSON.stringify(gallery)}</>;
  //  <button onclick={createGalleryPost()}>Create Entry</button>
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/artwork/:id" element={<SeeArtwork />} />
          <Route path="/personalexhibit" element={<PersonalExhibit />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// npm start
