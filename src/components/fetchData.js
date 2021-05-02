import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Image from "./Image";

const FetchData = ({ tag, pageNumber }) => {
  const [picture, setPictures] = useState([]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  const fetchImages = (tag) => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&text=${tag}&media=photos&per_page=12&page=1&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        let mapped = data.photos.photo.map((imageObj) => ({
          imageSrc: `https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`,
          imageId: imageObj.id,
        }));
        setPictures([...mapped]);
        
        console.log('hello',picture);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchImages(tag);
    window.history.replaceState(null, "New Page Title", `?query=${tag}`);
  }, [tag]);

  return (
    <div className="row">
      <h1>{tag}</h1>
      {
        tag.length > 0 ? <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {picture.map((image) => (
          <Image key={image.imageId} {...image} />
        ))}
      </Masonry> : 'No Images to show'
      }
    </div>
  );
};

export default FetchData;
