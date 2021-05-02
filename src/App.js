import { useState } from "react";

import GetPhotos from "./components/getPhotos"; 
import FetchData from "./components/fetchData"; 
import "./App.css";

function App() {
  const [tag, setTag] = useState("");
  const addTag = (tag) => {
    setTag(tag.tag);
  }



  
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Flickr Gallery</h1>
        <GetPhotos onAdd={addTag}/>
        <FetchData tag={tag} pageNumber={2}/>
      </div>
    </div>
  );
}

export default App;
