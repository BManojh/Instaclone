import React, { useState, useEffect } from 'react'

function Explore() {
  // State to store all videos/reels for the explore section
  const [exploreVideos, setExploreVideos] = useState([])
  
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true)
  
  // State to handle any errors
  const [error, setError] = useState(null)

  // Fetch videos when component loads
  useEffect(() => {
    fetchExploreVideos()
  }, [])

  // Function to fetch explore videos from the database
  const fetchExploreVideos = () => {
    fetch('http://localhost:5000/reels')
      .then((response) => response.json())
      .then((data) => {
        // Store the videos in state
        setExploreVideos(data)
        setIsLoading(false)
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error fetching videos:', error)
        setError('Failed to load videos')
        setIsLoading(false)
      })
  }

  // Show loading message
  if (isLoading) {
    return <div className="p-4">Loading explore videos...</div>
  }

  // Show error message if something goes wrong
  if (error) {
    return <div className="p-4 text-danger">{error}</div>
  }

  return (
    <div className="p-4">
      {/* Page Title */}
      <h2 className="mb-4">Explore</h2>

      {/* Container for all videos in a grid layout */}
      <div className="d-flex flex-column gap-4">
        {/* Check if videos exist and display them */}
        {exploreVideos && exploreVideos.length > 0 ? (
          exploreVideos.map((video) => (
            // Individual video card
            <div key={video.id} className="card">
              {/* Video thumbnail/image */}
              <img
                src={video.videoUrl}
                alt={video.caption}
                className="card-img-top"
                style={{
                  height: '400px',
                  objectFit: 'cover'
                }}
              />

              {/* Video details section */}
              <div className="card-body">
                {/* Creator's username and profile info */}
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-person-circle"></i>
                  <span className="fw-bold">{video.username}</span>
                </div>

                {/* Video caption/description */}
                <p className="card-text">{video.caption}</p>

                {/* Action buttons (like and comment) */}
                <div className="d-flex gap-3">
                  {/* Like button showing total likes */}
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-heart"></i>
                    {' '}
                    {video.likes ? video.likes.length : 0}
                  </button>

                  {/* Comment button showing total comments */}
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-chat-dots"></i>
                    {' '}
                    {video.comments ? video.comments.length : 0}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Message when no videos are available
          <div className="text-center">No videos available in Explore</div>
        )}
      </div>
    </div>
  )
}

export default Explore
