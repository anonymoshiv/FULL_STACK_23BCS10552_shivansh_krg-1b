import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function ViewStatus(){
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetchAll()
  },[])

  async function fetchAll(){
    try{
      const res = await api.get('/feedback')
      setItems(res.data)
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Submitted Feedback</h2>
      {items.length===0 ? <p>No submissions yet.</p> : (
        <div className="space-y-3">
          {items.map(it=> (
            <div key={it.id} className="bg-white p-3 rounded shadow">
              <div className="flex justify-between"><strong>{it.category}</strong><span className="text-sm">{it.status}</span></div>
              <div className="text-sm text-slate-600">{it.description}</div>
              <div className="text-xs text-slate-500">Submitted by: {it.studentName} | ID: {it.id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
