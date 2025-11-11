import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()
    setError('')
    
    try {
      // Store credentials for basic auth
      localStorage.setItem('auth', btoa(username + ':' + password)) // Base64 encode
      localStorage.setItem('username', username)
      
      // Call login endpoint to get role
      const res = await api.get('/auth/login')
      localStorage.setItem('role', res.data.role)
      
      // Redirect based on role
      if(res.data.role === 'ADMIN'){
        navigate('/admin')
      } else {
        navigate('/status')
      }
    } catch(err){
      setError('Invalid username or password')
      localStorage.clear()
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="block mb-3">
            Username
            <input 
              value={username} 
              onChange={e=>setUsername(e.target.value)} 
              className="w-full border p-2 rounded mt-1" 
              required 
            />
          </label>
          <label className="block mb-3">
            Password
            <input 
              type="password"
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              className="w-full border p-2 rounded mt-1" 
              required 
            />
          </label>
          {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  )
}
