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
      <section id="endpoints">
        <a href="http://localhost:3000/"> Home </a>
        <a href="http://localhost:3000/about"> About </a>
        <a href="http://localhost:3000/gallery"> Gallery </a>
        <a href="http://localhost:3000/myexhibit"> My Exhibit </a>
      </section>
      
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
