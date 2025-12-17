import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom' 
import Viewstory from './viewstory.jsx'
import Profile from './profile.jsx'
import Reels from './reels.jsx'
import Login from './Login.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'


const router=createBrowserRouter([
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/',
    element:<ProtectedRoute><App/></ProtectedRoute>
  },
  {
    path:'/story/:id/:tot',
    element:<ProtectedRoute><Viewstory/></ProtectedRoute>
  },
  {
    path:'/profile',
    element:<ProtectedRoute><Profile/></ProtectedRoute>
  },
  {
    path:'/reels',
    element:<ProtectedRoute><Reels/></ProtectedRoute>
  }
])
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>

)
