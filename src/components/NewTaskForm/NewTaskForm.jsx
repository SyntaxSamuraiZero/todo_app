import React from 'react'
import PropTypes from 'prop-types'

export default function NewTaskForm({
  inputValue,
  setInputValue,
  minutesValue,
  setMinutesValue,
  secondsValue,
  setSecondsValue,
  handleKeyDown,
}) {
  return (
    <form className='new-todo-form'>
      <input
        className='new-todo'
        name='inputValue'
        type='text'
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value)
        }}
        onKeyDown={handleKeyDown}
        placeholder='Task'
        autoFocus
      ></input>
      <input
        className='new-todo-form__timer'
        name='minutesValue'
        type='number'
        value={minutesValue}
        onChange={(event) => {
          let value = event.target.value

          if (isNaN(value)) {
            value = ''
          } else if (value < 0) {
            value = '0'
          } else if (value > 999) {
            value = '999'
          }

          setMinutesValue(value)
        }}
        onKeyDown={(event) => {
          if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
            event.preventDefault()
          }
        }}
        placeholder='Min'
        autoFocus
      />
      <input
        className='new-todo-form__timer'
        name='secondsValue'
        type='number'
        value={secondsValue}
        onChange={(event) => {
          let value = event.target.value

          if (isNaN(value)) {
            value = ''
          } else if (value < 0) {
            value = '0'
          } else if (value > 59) {
            value = '59'
          }

          setSecondsValue(value)
        }}
        onKeyDown={(event) => {
          if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
            event.preventDefault()
          }
        }}
        placeholder='Sec'
        autoFocus
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  inputValue: PropTypes.string,
  minutesValue: PropTypes.string,
  secondsValue: PropTypes.string,
  setInputValue: PropTypes.func,
  setMinutesValue: PropTypes.func,
  setSecondsValue: PropTypes.func,
  handleKeyDown: PropTypes.func.isRequired,
}
