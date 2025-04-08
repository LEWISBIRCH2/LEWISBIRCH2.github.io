import "./App.css";
import Header from "./Header";
import About from "./About";
import Gallery from "./Gallery";
import MyExhibit from "./MyExhibit";
import { Routes, Route } from "react-router-dom";
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

  // function createGalleryPost() {
  //   let galleryObject = {
  //     museum: "testPost WITH API",
  //     title: "postedTitle",
  //     description: "A hardcoded post",
  //   };
  //   createGallery(galleryObject);
  // }

  //  <button onclick={createGalleryPost()}>Create Entry</button>
  return (
    <>
      <Header />
      <br></br>
      <br></br>
      {JSON.stringify(gallery)}

      <br></br>
      <br></br>

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
