import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

export default function Task({ item, deleteTask, onTaskDone, setEditTask }) {
  const [newTask, setNewTask] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(item.id), { includeSeconds: true }))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(item.id), { includeSeconds: true }))
    }, 10000)

    return () => clearInterval(intervalId)
  }, [item.id])

  const editTask = () => {
    setIsEditing(true)
  }

  const handleInputChange = (event) => {
    setNewTask(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const newItem = newTask.trim()
      if (newItem === '') {
        setIsEditing(false)
      } else {
        setEditTask(item.id, newItem)
        setNewTask('')
        setIsEditing(false)
      }
    }
  }

  const handleBlur = () => {
    const newItem = newTask.trim()
    if (newItem === '') {
      setIsEditing(false)
    } else {
      setEditTask(item.id, newItem)
      setNewTask('')
      setIsEditing(false)
    }
  }

  return (
    <li className={isEditing ? 'editing' : item.done ? 'completed' : ''}>
      <div className="view">
        <input
          id={`task-${item.id}`}
          name={`task-${item.id}`}
          className="toggle"
          type="checkbox"
          checked={item.done}
          onChange={() => onTaskDone(item.id)}
        />
        <label
          onClick={() => {
            onTaskDone(item.id)
          }}
        >
          <span className="description">{item.task}</span>
          <span className="created">created {timeAgo} ago</span>
        </label>
        <button className="icon icon-edit" onClick={item.done ? () => {} : () => editTask()}></button>
        <button
          className="icon icon-destroy"
          onClick={() => {
            deleteTask(item.id)
          }}
        ></button>
      </div>
      {isEditing && (
        <input
          id={`edit-task-${item.id}`}
          name={`edit-task-${item.id}`}
          type="text"
          className="edit"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
        />
      )}
    </li>
  )
}

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  onTaskDone: PropTypes.func.isRequired,
  setEditTask: PropTypes.func.isRequired,
}
