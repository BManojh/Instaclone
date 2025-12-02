import React from 'react'
import { useState, useEffect } from 'react'

function Posts() {

  const [post, setpost] = useState([]);
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((date) => date.json())
      .then((data) => setpost(data))
      .catch(err => console.log(err));

    fetch("http://localhost:5000/users")
      .then((date) => date.json())
      .then((data) => setusers(data))
      .catch(err => console.log(err));

  }, [])

  return (
    <div className=" my-3 d-flex justify-content-center">
      {post.length > 0 ? (
        <div >
          {post.map((post) => {
            const user = users.find((u) => u.id === post.userId);

            return (
              <div key={post.id} className="mb-4">

                {/* Profile Section */}
                {user && (
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={user.profilePic}
                      style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                    />
                    <h6>{user.username}</h6>
                  </div>
                )}

                {/* Post Image */}
                <div className="d-flex">
                  <img className="post" src={post.imageUrl} alt="" />
                </div>

                {/* Icons */}
                <div>
                  <i className="bi bi-heart"></i>
                  <i className="bi bi-chat"></i>
                  <i className="bi bi-share"></i>
                </div>

                {/* Likes */}
                <div>
                  likes: {post.likes.length}
                </div>

                {/* Caption */}
                <h5>{post.caption}</h5>

              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Posts;
