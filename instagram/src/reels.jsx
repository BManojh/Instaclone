import React, { useState, useEffect } from 'react'

function Reels() {
  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/reels')
      .then((response) => response.json())
      .then((data) => {
        setReels(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="p-4">Loading reels...</div>
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">Reels</h2>
      <div className="d-flex flex-column gap-4">
        {reels && reels.length > 0 ? (
          reels.map((reel) => (
            <div key={reel.id} className="card">
              <img src={reel.videoUrl} alt={reel.caption} className="card-img-top" style={{ height: '400px', objectFit: 'cover' }} />
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-person-circle"></i>
                  <span className="fw-bold">{reel.username}</span>
                </div>
                <p className="card-text">{reel.caption}</p>
                <div className="d-flex gap-3">
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-heart"></i> {reel.likes ? reel.likes.length : 0}
                  </button>
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-chat-dots"></i> {reel.comments ? reel.comments.length : 0}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No reels available</div>
        )}
      </div>
    </div>
  )
}

export default Reels
