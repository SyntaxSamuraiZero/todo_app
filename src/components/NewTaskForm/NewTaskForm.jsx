import React from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default function NewTaskForm({ inputValue = '', handleInputChange, handleKeyDown }) {
  return (
    <input
      className="new-todo"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="What needs to be done?"
      autoFocus
    ></input>
  )
}

NewTaskForm.propTypes = {
  inputValue: PropTypes.node,
  handleInputChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
}
