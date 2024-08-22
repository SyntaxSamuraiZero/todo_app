import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'

export default function Footer({ filter, setFilter, itemsLeft = 0, clearCompleted }) {
  const filters = ['All', 'Active', 'Completed']

  return (
    <footer className='footer'>
      <span className='todo-count'>{itemsLeft} items left</span>
      <ul className='filters'>
        {filters.map((filterName) => (
          <TasksFilter key={filterName} filterName={filterName} filter={filter} setFilter={setFilter} />
        ))}
      </ul>
      <button className='clear-completed' onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  itemsLeft: PropTypes.number,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}
