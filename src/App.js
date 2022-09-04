import React, { useState, useEffect, useRef } from "react"
import './App.css';
import { useTodoLayerValue } from "./context/TodoContext"
import TodoList from "./components/TodoList"

function App() {
  const [{ todos }, dispatch] = useTodoLayerValue();
  const [content, setContent] = useState("")

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = (event) => {

    event.preventDefault();

    if (!content || content.length < 2) return;

    const newTodo = {
      id: Math.floor(Math.random() * 428743240),
      content,
      isCompleted: false
    }

    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    })

    setContent(' ');

  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className="todo-form">
        <input type="text" className='todo-input' onChange={(event) => setContent(event.target.value)} value={content} ref={inputRef} />
        <button className="todo-button">
          Ekle
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
}

export default App;
