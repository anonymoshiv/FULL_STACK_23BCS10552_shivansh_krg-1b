import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SubmitFeedback from './pages/SubmitFeedback'
import ViewStatus from './pages/ViewStatus'
import AdminDashboard from './pages/AdminDashboard'
import './index.css'

// Simple auth check
function isLoggedIn(){
  return !!localStorage.getItem('auth')
}

function ProtectedRoute({children}){
  return isLoggedIn() ? children : <Navigate to="/login" />
}

function App(){
  const navigate = useNavigate()
  
  function handleLogout(){
    localStorage.clear()
    navigate('/login')
  }
  
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-6 flex gap-4">
          <h1 className="text-xl font-semibold">Student Grievance Portal</h1>
          {isLoggedIn() && (
            <nav className="ml-auto flex gap-3 items-center">
              <Link to="/" className="text-slate-700">Home</Link>
              <Link to="/submit" className="text-slate-700">Submit</Link>
              <Link to="/status" className="text-slate-700">My Status</Link>
              {role === 'ADMIN' && <Link to="/admin" className="text-slate-700">Admin</Link>}
              <span className="text-sm text-slate-500">({username})</span>
              <button onClick={handleLogout} className="text-sm text-red-600">Logout</button>
            </nav>
          )}
        </div>
      </header>
      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/submit" element={<ProtectedRoute><SubmitFeedback /></ProtectedRoute>} />
          <Route path="/status" element={<ProtectedRoute><ViewStatus /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

function Root(){
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
