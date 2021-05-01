import React from "react";

const Image = ({ imageSrc }) => {
  return (
    <div>
      <img
        src={imageSrc}
        className="img-fluid "
        alt="okay"
        width="90%"
        height="90%"
      ></img>
    </div>
  );
};

export default Image;
