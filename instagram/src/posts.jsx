import React from 'react'
import { useState, useEffect } from 'react'

function Posts() {

  const [post, setpost] = useState([]);
  const [users, setusers] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

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

  const patchPost = (postId, payload) => {
    fetch(`http://localhost:5000/posts/${postId}` , {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch((err) => console.error('Failed to update post', postId, err));
  };

  const handleLike = (postId) => {
    let updatedLikes = [];
    setpost((prevPosts) =>
      prevPosts.map((item) => {
        if (item.id === postId) {
          const likesArray = Array.isArray(item.likes) ? item.likes : [];
          updatedLikes = [...likesArray, `local-${Date.now()}`];
          return { ...item, likes: updatedLikes };
        }
        return item;
      })
    );

    if (updatedLikes.length > 0) {
      patchPost(postId, { likes: updatedLikes });
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = (postId) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    const newComment = {
      id: Date.now(),
      userId: 0,
      text,
      time: new Date().toISOString()
    };

    let updatedComments = [];
    setpost((prevPosts) =>
      prevPosts.map((item) => {
        if (item.id === postId) {
          updatedComments = [...(item.comments || []), newComment];
          return { ...item, comments: updatedComments };
        }
        return item;
      })
    );

    if (updatedComments.length > 0) {
      patchPost(postId, { comments: updatedComments });
    }

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

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
                <div className="d-flex gap-3 my-2">
                  <i className="bi bi-heart" role="button" onClick={() => handleLike(post.id)}></i>
                  <i className="bi bi-chat"></i>
                  <i className="bi bi-share"></i>
                </div>

                {/* Likes */}
                <div>
                  likes: {Array.isArray(post.likes) ? post.likes.length : 0}
                </div>

                {/* Caption */}
                <h5>{post.caption}</h5>

                {/* Comments */}
                <div className="mt-2">
                  <div className="mb-2">
                    {(post.comments || []).map((comment) => {
                      const commentUser = users.find((u) => u.id === comment.userId);
                      return (
                        <div key={comment.id} className="d-flex align-items-center mb-1">
                          <strong className="me-2">{commentUser ? commentUser.username : 'You'}</strong>
                          <span>{comment.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="d-flex gap-2">
                    <input
                      className="form-control"
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={() => handleAddComment(post.id)}>Post</button>
                  </div>
                </div>

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
