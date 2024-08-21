import React, { useState, useEffect } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items')
    return savedItems ? JSON.parse(savedItems) : []
  })
  const [inputValue, setInputValue] = useState('')
  const [minutesValue, setMinutesValue] = useState('')
  const [secondsValue, setSecondsValue] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const newItem = inputValue.trim()
      if (newItem !== '') {
        setItems([
          ...items,
          {
            id: Date.now(),
            task: newItem,
            min: parseInt(minutesValue) || 0,
            sec: parseInt(secondsValue) || 0,
            done: false,
            className: '',
          },
        ])
        setInputValue('')
        setMinutesValue('')
        setSecondsValue('')
      }
    }
  }

  const doneTask = (id) => {
    const index = items.findIndex((el) => el.id === id)
    const newItem = { ...items[index], done: !items[index].done }
    const newArray = [...items.slice(0, index), newItem, ...items.slice(index + 1)]

    setItems(() => newArray)
  }

  const editTask = (id, newTask) => {
    const index = items.findIndex((el) => el.id === id)
    const newItem = { ...items[index], task: newTask }
    const newArray = [...items.slice(0, index), newItem, ...items.slice(index + 1)]

    setItems(() => newArray)
  }

  const deleteTask = (id) => {
    const newArray = items.filter((el) => el.id !== id)

    setItems(() => newArray)
  }

  let itemsLeft = items.filter((item) => item.done === false).length

  const getFilteredTask = () => {
    return items.map((item) => {
      if (filter === 'Active' && item.done) {
        return { ...item, className: 'hidden' }
      } else if (filter === 'Completed' && !item.done) {
        return { ...item, className: 'hidden' }
      } else {
        return { ...item, className: '' }
      }
    })
  }

  const clearCompleted = () => {
    const newArray = items.filter((el) => el.done !== true)

    setItems(() => newArray)
  }

  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>Todos</h1>
        <NewTaskForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          minutesValue={minutesValue}
          setMinutesValue={setMinutesValue}
          secondsValue={secondsValue}
          setSecondsValue={setSecondsValue}
          handleKeyDown={handleKeyDown}
        />
      </header>
      <section className='main'>
        <TaskList getFilteredTask={getFilteredTask} doneTask={doneTask} editTask={editTask} deleteTask={deleteTask} />
        <Footer filter={filter} setFilter={setFilter} itemsLeft={itemsLeft} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}
