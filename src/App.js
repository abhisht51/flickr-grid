import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";

import Image from "./components/Image";
import "./App.css";

function App() {
  const [picture, setPictures] = useState([]);

  // const fetchData = (pageNumber) =>{
  // }
  let fetchURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&text=cat&media=photos&per_page=12&page=1&format=json&nojsoncallback=1`;

  console.log(picture);

  const fetchImages = (pageNumber) => {
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        let mapped = data.photos.photo.map((imageObj) => ({
          imageSrc: `https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`,
          imageId: imageObj.id,
        }));
        setPictures([...picture, ...mapped]);
        console.log("hello");
        console.log(picture);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let tag = "lookl";
    fetchImages(2);
    window.history.replaceState(null, "New Page Title", `${tag}`);
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  const loadMoreImages = () => {
    console.log("clicked");
  };
  return (
    <div className="App">
      <div className="container">
        <h1>ok World</h1>
        <div className="row">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {picture.map((image) => (
              <Image key={image.id} {...image} />
            ))}
          </Masonry>
        </div>
        <button onClick={loadMoreImages}>Load More</button>
      </div>
    </div>
  );
}

export default App;
