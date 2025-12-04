import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
function Profile() {

    const[profile,setprofile]=useState(null);

    const[followers,setfollowers]=useState([]);

    const[unfollowed,setunfollowed]=useState(false);
    
    useEffect(()=>{
        axios.get('http://localhost:5000/profile')
        .then(data=>setprofile(data.data))
    },[])

    useEffect(()=>{
        axios.get('http://localhost:5000/followers')
        .then(data=>setfollowers(data.data))
},[unfollowed])
 
    function Handle(e)  
    {
        setprofile({...profile,
        [e.target.name]:e.target.value});
    }

    const handlesubmit=async()=>
    {
        axios.put('http://localhost:5000/profile',profile)
        .then(response=>console.log(response))
    }

    const habdledelete=async(id)=>
    {
        axios.delete(`http://localhost:5000/followers/${id}`)
        .then(response=>alert("follower removed"))
        .then(() => setunfollowed(!unfollowed))
    }

  return (
    <div>
        {profile ? (
            <div>
            <h5>{profile.username}</h5>
            <h5>{profile.name}</h5>
            <img src={profile.profilePic} alt="profile pic" style={{width:"200px",height:"200px",borderRadius:"50%"}}/>
            
            <input type="text"
                value={profile.username}
                name="username"
                className='form-control my-4' onChange={Handle}/>

            <input type="text"
                value={profile.profilePic}
                name="profilePic"
                className='form-control my-4' onChange={Handle}/>


            <button className="btn btn-primary" onClick={handlesubmit}>
                update
            </button>

            </div>
        ):(
        
            <p>Loading...</p>
        ) }

        {
        followers.length > 0  ? (
            followers.map(follower=>
            (
                <div key={follower.id} className="d-flex">
                    <p>{follower.username}</p>
                    <button className="btn btn-danger ms-auto" onClick={() => habdledelete(follower.id)}>Remove</button>
                </div>
            )
            ))
         : (
            <p>No followers</p>
        )
        }

        
    </div>
  )
}

export default Profile