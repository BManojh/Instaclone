import React from 'react'
import Sidebar from './sidebar.jsx'
import Feed from './feed.jsx'
import Suggestion from './suggestion.jsx'
function App() {
  return (
    <div className="d-flex vh-100 ">
      <div className="w-20"><Sidebar/></div>
      <div className="w-50  "><Feed></Feed></div>
      <div className='w-30'><Suggestion></Suggestion></div>
      </div>
  )
}

export default App