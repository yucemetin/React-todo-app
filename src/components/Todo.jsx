import React, { useState } from 'react'
import { GrFormClose, GrFormEdit, GrFormCheckmark, GrSave } from "react-icons/gr"
import { useTodoLayerValue } from '../context/TodoContext'
import clsx from 'clsx'

const Todo = ({ todo }) => {
  const [{ }, dispatch] = useTodoLayerValue()
  const [editable, setEditable] = useState(false)
  const [content, setContent] = useState(todo.content)

  const removeTodo = (todoId) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: todoId
    })
  }

  const completeTodo = (todoId) => {
    dispatch({
      type: "COMPLETE_TODO",
      payload: todoId
    })
  }

  const updateTodo = ({ todoId, newValue }) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: {
        todoId,
        newValue
      }
    })
  }

  const todoStyle = clsx({
    ["todo-row"]: true,
    ["completed"]: todo.isCompleted
  })
  return (
    <div className={todoStyle}>
      <div>
        {editable ? <input className='todo-input-edit' value={content} type="text" onChange={event => setContent(event.target.value)} /> : todo.content}
      </div>
      <div className="todo-icons">
        <GrFormClose className='todo-icon' onClick={() => removeTodo(todo.id)} />
        {editable ? <GrSave className='todo-icon' onClick={() => {
          updateTodo({ todoId: todo.id, newValue: content });
          setEditable(false);
        }} /> : <GrFormEdit className='todo-icon' onClick={() => setEditable(true)} />}

        <GrFormCheckmark className='todo-icon' onClick={() => completeTodo(todo.id)} />
      </div>
    </div>
  )
}

export default Todo