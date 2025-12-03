import React from 'react'
import { useState, useEffect } from 'react'
function Stories() {
  const[stories,setstories]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:5000/stories")
    .then((response)=>response.json())
    .then((data)=>setstories(data))
    .catch((err)=>console.log(err))
},[]);
  return (
    <div className="story d-flex">
      {stories.length>0 ? (
        stories.map((story)=>(
          <div key={story.id} className="mx-1">
            <div className="gradient-border">
                 <img src={story.imageUrl} alt="" className="story-db rounded-circle"/>
              </div>
            <p className="text-truncate" style={{width: "40px"}}>{story.username}</p> 
          </div>
        ))
      ):(
        <p>Loading..</p>
      )}
    </div>
      )
    
}

export default Stories