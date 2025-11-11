import React, { useState } from 'react'
import api from '../services/api'

export default function SubmitFeedback(){
  const [studentName, setStudentName] = useState('')
  const [category, setCategory] = useState('General')
  const [description, setDescription] = useState('')
  const [saved, setSaved] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()
    try{
      const res = await api.post('/feedback', { studentName, category, description })
      setSaved(res.data)
      setStudentName('')
      setCategory('General')
      setDescription('')
    }catch(err){
      console.error(err)
      alert('Failed to submit')
    }
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-lg font-semibold mb-4">Submit Feedback / Complaint</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <label className="block mb-2">Your name
          <input value={studentName} onChange={e=>setStudentName(e.target.value)} className="w-full border p-2 rounded mt-1" required />
        </label>
        <label className="block mb-2">Category
          <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full border p-2 rounded mt-1">
            <option>General</option>
            <option>Academics</option>
            <option>Administration</option>
            <option>Hostel</option>
          </select>
        </label>
        <label className="block mb-2">Description
          <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border p-2 rounded mt-1" rows={6} required />
        </label>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </form>

      {saved && (
        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400">Submitted successfully. ID: {saved.id} — Status: {saved.status}</div>
      )}
    </div>
  )
}
