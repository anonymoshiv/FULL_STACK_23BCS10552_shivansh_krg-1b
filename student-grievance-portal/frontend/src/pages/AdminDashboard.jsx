import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function AdminDashboard(){
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(()=>{ fetchAll() }, [])

  async function fetchAll(){
    try{
      const res = await api.get('/feedback')
      setItems(res.data)
    }catch(err){ console.error(err) }
  }

  async function updateStatus(id, status){
    try{
      await api.put(`/feedback/${id}`, { status })
      fetchAll()
    }catch(err){ console.error(err) }
  }

  async function remove(id){
    if(!confirm('Delete this feedback?')) return
    try{ await api.delete(`/feedback/${id}`); fetchAll() }catch(err){ console.error(err) }
  }

  const filtered = items.filter(i => !filter || i.status===filter || i.category===filter)

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
      <div className="mb-3">
        <label>Filter:
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="ml-2 border p-1">
            <option value="">All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>General</option>
            <option>Academics</option>
            <option>Administration</option>
            <option>Hostel</option>
          </select>
        </label>
      </div>
      {filtered.map(it=> (
        <div key={it.id} className="bg-white p-3 rounded shadow mb-2">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{it.category} — {it.studentName}</div>
              <div className="text-sm text-slate-600">{it.description}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <select value={it.status} onChange={e=>updateStatus(it.id, e.target.value)} className="border p-1">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <button onClick={()=>remove(it.id)} className="text-red-600 text-sm">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
