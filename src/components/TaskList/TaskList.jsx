import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

export default function TaskList({ getFilteredTask, deleteTask, onTaskDone, setEditTask }) {
  return (
    <ul className="todo-list">
      {getFilteredTask().map((item) => (
        <Task key={item.id} item={item} deleteTask={deleteTask} onTaskDone={onTaskDone} setEditTask={setEditTask} />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  getFilteredTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  onTaskDone: PropTypes.func.isRequired,
  setEditTask: PropTypes.func.isRequired,
}
