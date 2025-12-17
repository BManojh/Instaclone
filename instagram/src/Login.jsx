import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response =  await fetch('http://localhost:5000/users')
      const users =  await response.json()
      
      const user = users.find(u => u.username === username && u.password === password)
      
      if (user) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userId', user.id)
        localStorage.setItem('username', user.username)
        navigate('/')
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
      console.error(err)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '400px' }}>
        <div className="text-center mb-4">
          <img src="/assets/images.png" alt="Instagram" style={{ width: '180px' }} />
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="alert alert-danger py-2">{error}</div>}
          
          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
        </form>
        
        <div className="text-center mt-3 text-muted small">
          Test credentials: manojh_b / password123
        </div>
      </div>
    </div>
  )
}

export default Login
