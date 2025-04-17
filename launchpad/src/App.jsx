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

function App() {
  //Currenty obsolete. Used for added security measures.
  useEffect(() => {
    let stored = localStorage.getItem("User");
    if (stored) {
      axios.defaults.headers.common["authorization"] = `Bearer ${stored}`;
    }
  }, []);

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
