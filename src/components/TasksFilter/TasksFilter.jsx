import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default function TasksFilter({ filterName, filter, setFilter }) {
  return (
    <li>
      <button className={filter === filterName ? 'selected' : ''} onClick={() => setFilter(filterName)}>
        {filterName}
      </button>
    </li>
  )
}

TasksFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
}
