import React, { useState, useEffect } from 'react';

function Suggestion() {

  const [profile, setprofile] = useState({});
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/profile")
      .then((response) => response.json())
      .then((data) => setprofile(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/suggestions")   
      .then((response) => response.json())
      .then((data) => setSuggestion(data))
      .catch((err) => console.log(err));
  }, []);  
  

  return (
    <div>
      {profile && (
        <div className="suggestions w-75 m-4">

          <div className="d-flex align-items-center mb-2">
            <img
              src={profile.profilePic}
              style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
            />
            <h6>{profile.name}</h6>
            <small className="ms-auto text-primary">switch</small>
          </div>

         
          <div className="d-flex">
            <p>Suggested for you</p>
            <b className="ms-auto">See All</b>
          </div>

          
          {suggestion.length > 0 ? (
            <div>
              {suggestion.map((post) => (
                <div key={post.id} className="d-flex align-items-center my-3">

                  <img
                    src={post.profilePic}
                    style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                  />

                  <div>
                    <h6 style={{ margin: 0 }}>{post.username}</h6>
                    <small>{post.mutual} mutual followers</small>
                  </div>

                  <button className="ms-auto btn btn-sm btn-primary rounded-pill px-3">
                    Follow
                  </button>

                </div>
              ))}
            </div>
          ) : (
            <div>Loading...</div>
          )}

        </div>
      )}
    </div>
  );
}

export default Suggestion;
