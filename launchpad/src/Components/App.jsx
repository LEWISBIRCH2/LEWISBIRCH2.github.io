import "./App.css";
import Header from "./Header";
import About from "./About";
import Gallery from "./Gallery";
import MyExhibit from "./MyExhibit";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/myexhibit" element={<MyExhibit />} />
      </Routes>
    </>
  );
}

export default App;

// npm start
