import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom' 
import Viewstory from './viewstory.jsx'
import Profile from './profile.jsx'
import Reels from './reels.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/story/:id/:tot',
    element:<Viewstory/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/reels',
    element:<Reels/>
  }
])
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>

)
