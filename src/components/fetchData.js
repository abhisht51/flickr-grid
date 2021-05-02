import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Image";

import './masonry.css'

const FetchData = ({ tag }) => {
  const [picture, setPictures] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

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
        setPageNumber(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchImages(tag);
    window.history.replaceState(null, "New Page Title", `?query=${tag}`);
    // eslint-disable-next-line
  }, [tag]);

  const loadMoreImages = (pageNumber) => {
    setPageNumber(++pageNumber);
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&text=${tag}&media=photos&per_page=12&page=${pageNumber}&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        let mapped = data.photos.photo.map((imageObj) => ({
          imageSrc: `https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`,
          imageId: imageObj.id,
          alt: imageObj.title,
        }));
        setPictures([...picture, ...mapped]);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="row">
      {(tag.length && picture.length) > 0 ? (
        <InfiniteScroll
          dataLength={picture.length}
          next={() => loadMoreImages(pageNumber)}
          hasMore={true}
          loader={<h4>Loading More Images...</h4>}
        >
          <h1 className="search-text">Images for {tag}</h1>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {picture.map((image) => (
              <Image key={image.imageId} {...image} />
            ))}
          </Masonry>
        </InfiniteScroll>
      ) : (
        "No Images to show"
      )}
    </div>
  );
};

export default FetchData;
