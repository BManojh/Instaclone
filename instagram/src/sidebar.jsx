import React from 'react'
import logo from './assets/images.png'

function Sidebar() {
  return (
    <div className="m-3 position-fixed">
        <div className="d-flex flex-column gap-4 ">
        <img className="logo-text" src={logo} alt="Instagram logo" />
        <div><i className="bi bi-house-door"></i>Home</div>
        <div><i className="bi bi-search"></i>Search</div>
        <div><i className="bi bi-compass-fill"></i>Explore</div>
        <div><i className="bi bi-play-btn-fill"></i>Reels</div>
        <div><i className="bi bi-chat-left-dots"></i>Messages</div>
        <div><i className="bi bi-bell-fill"></i>Notifications</div>
        <div><i className="bi bi-plus-square-fill"></i>Create</div>
        <div><i className="bi bi-person-circle"></i>Profile</div>
        </div>
   
    <div className="position-fixed bottom-0 d-flex flex-column gap-3 mb-3">
        <div><i className="bi bi-threads"></i>Threads</div>
        <div><i className="bi bi-list"></i>More</div>
    </div> 
     </div>
    
  )
}

export default Sidebar