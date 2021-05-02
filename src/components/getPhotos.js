import React,{useState} from 'react'
import './getPhotos.css'
const GetPhotos = ({onAdd}) => {
    const [tag, setTag] = useState("");


    const searchImages = async (e) => {
        e.preventDefault();
        if(!tag){
            alert('Please add a tag');
            return
        }
        onAdd({tag})
        setTag("");
      };
    return (
        <>
      <form className="form" onSubmit={searchImages}> 
        <label className="label" htmlFor="query"> 
          {/* {""} */}
          🔍
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Search free high resolution photos`}
          value={tag}
          onChange={(e)=>setTag(e.target.value)}
        />
        <button type="submit" className="button" >
          Search
        </button>
      </form >
    </>
    )
}

export default GetPhotos
