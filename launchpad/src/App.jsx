import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SeeArtwork } from "./Pages/SeeArtworkPage";
import { LandingPage } from "./Pages/LandingPage";
import { AboutPage } from "./Pages/AboutPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { HomePage } from "./Pages/HomePage";
import { AllArtwork } from "./Pages/AllArtwork";
import "./App.css";
import { Layout } from "./Components/Layout";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/gallery/:id" element={<SeeArtwork />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/allartwork" element={<AllArtwork />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// npm start
