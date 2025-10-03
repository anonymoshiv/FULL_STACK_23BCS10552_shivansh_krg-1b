import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedText = taskText.trim()

    if (!trimmedText) {
      return
    }

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmedText
      }
    ])

    setTaskText('')
  }

  return (
    <div className="app">
      <h1 className="app__title">Todo List</h1>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a task"
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {tasks.length === 0 ? (
          <li className="todo-empty">No tasks yet</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
