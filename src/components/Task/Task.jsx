import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default function Task({ item, doneTask, editTask, deleteTask }) {
  const [newTask, setNewTask] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [minutes, setMinutes] = useState(item.min)
  const [seconds, setSeconds] = useState(item.sec)
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(item.id), { includeSeconds: true }))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(item.id), { includeSeconds: true }))
    }, 10000)

    return () => clearInterval(intervalId)
  }, [item.id])

  useEffect(() => {
    let timer
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec === 59) {
            setMinutes((prevMin) => prevMin + 1)
            return 0
          } else {
            return prevSec + 1
          }
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isRunning])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      const newItem = newTask.trim()
      if (newItem === '') {
        setIsEditing(false)
      } else {
        editTask(item.id, newItem)
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
      editTask(item.id, newItem)
      setNewTask('')
      setIsEditing(false)
    }
  }

  return (
    <li
      className={`${isEditing ? 'editing' : item.done ? 'completed' : ''} ${item.className === 'hidden' ? 'hidden' : ''}`}
    >
      <div className='view'>
        <input
          id={`task-${item.id}`}
          name={`task-${item.id}`}
          className='toggle'
          type='checkbox'
          checked={item.done}
          onChange={() => {
            if (!item.done) {
              setIsRunning(false)
            }
            doneTask(item.id)
          }}
        />
        <label>
          <span className='title'>{item.task}</span>
          <span className='description'>
            <button className='icon icon-play' onClick={() => (item.done ? () => {} : setIsRunning(true))}></button>
            <button className='icon icon-pause' onClick={() => setIsRunning(false)}></button>
            <span className='timer'>
              {minutes}:{seconds}
            </span>
          </span>
          <span className='description'>created {timeAgo} ago</span>
        </label>
        <button className='icon icon-edit' onClick={item.done ? () => {} : () => setIsEditing(true)}></button>
        <button
          className='icon icon-destroy'
          onClick={() => {
            deleteTask(item.id)
          }}
        ></button>
      </div>
      {isEditing && (
        <input
          id={`edit-task-${item.id}`}
          name={`edit-task-${item.id}`}
          type='text'
          className='edit'
          value={newTask || item.task}
          onChange={(event) => {
            setNewTask(event.target.value)
          }}
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
  doneTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}
