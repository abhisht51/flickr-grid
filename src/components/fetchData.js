// import React from 'react'

// const fetchData = ({keyword, pageNumber}) => {
//     let API_key =  process.env.REACT_APP_API_KEY;
//     fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_key}&text=cat&media=photos&per_page=12&page=1&format=json&nojsoncallback=1`)
//     .then((response)=> response.json())
//     .then((data)=>{
//       console.log(data);
//       let picArray = data.photos.photo.map((imageObj)=>{
//         let srcPath = `https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`;
//         return;
//       })
//     })




//     return (
//         <div>
            
//         </div>
//     )
// }

// export default fetchData
