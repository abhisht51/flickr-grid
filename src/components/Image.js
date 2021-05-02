import React from "react";

const Image = ({ imageSrc, alt }) => {
  return (
    <div>
      <img
        src={imageSrc}
        className="card--image"
        alt={alt}
        width="100%"
        height="100%"
      ></img>
    </div>
  );
};

export default Image;
