import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default function App() {
  const [items, setItems] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('All')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const newItem = inputValue.trim()
      if (newItem !== '') {
        setItems([
          ...items,
          {
            id: Date.now(),
            task: newItem,
            done: false,
          },
        ])
        setInputValue('')
      }
    }
  }

  const setEditTask = (id, newTask) => {
    const index = items.findIndex((el) => el.id === id)
    const newItem = { ...items[index], task: newTask }
    const newArray = [...items.slice(0, index), newItem, ...items.slice(index + 1)]

    setItems(() => newArray)
  }

  const deleteTask = (id) => {
    const newArray = items.filter((el) => el.id !== id)

    setItems(() => newArray)
  }

  const onTaskDone = (id) => {
    const index = items.findIndex((el) => el.id === id)
    const newItem = { ...items[index], done: !items[index].done }
    const newArray = [...items.slice(0, index), newItem, ...items.slice(index + 1)]

    setItems(() => newArray)
  }

  let itemsLeft = items.filter((item) => item.done === false).length

  const getFilteredTask = () => {
    if (filter === 'Active') {
      return items.filter((item) => !item.done)
    } else if (filter === 'Completed') {
      return items.filter((item) => item.done)
    } else if (filter === 'All') {
      return items
    }
  }

  const clearCompleted = () => {
    const newArray = items.filter((el) => el.done !== true)

    setItems(() => newArray)
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm inputValue={inputValue} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown} />
      </header>
      <section className="main">
        <TaskList
          getFilteredTask={getFilteredTask}
          onTaskDone={onTaskDone}
          setEditTask={setEditTask}
          deleteTask={deleteTask}
        />
        <Footer filter={filter} setFilter={setFilter} itemsLeft={itemsLeft} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}
