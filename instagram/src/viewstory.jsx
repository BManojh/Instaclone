import React from 'react'
import {useState,useEffect} from 'react'
import {useParams,Link,useNavigate} from 'react-router-dom'
function Viewstory() {

    const {id,tot}=useParams();

    const[story,setstory]=useState();

    const navigate=useNavigate();

    useEffect(()=>{
        fetch('http://localhost:5000/stories/'+id)
        .then((response)=>response.json())
        .then((data)=>setstory(data))
        .catch((error)=>console.log(error))
    },[id])

    if(id>tot || id<=0)
    {
        navigate('/');
    }
  return (
    <div>
        {story ? <div className="d-flex justify-content-center align-items-center vh-100">
            <Link to={`/story/${Number(id)-1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
            <img src={story.imageUrl} alt="story image" />
            <Link to={`/story/${Number(id)+1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
        </div> : <div>Loading...</div> }
    </div>
  )
}

export default Viewstory;