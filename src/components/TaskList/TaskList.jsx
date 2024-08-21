import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

export default function TaskList({ getFilteredTask, doneTask, editTask, deleteTask }) {
  return (
    <ul className='todo-list'>
      {getFilteredTask().map((item) => (
        <Task key={item.id} item={item} doneTask={doneTask} editTask={editTask} deleteTask={deleteTask} />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  getFilteredTask: PropTypes.func.isRequired,
  doneTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}
