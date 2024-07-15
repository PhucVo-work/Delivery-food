import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
        <Navbar/>
        <hr/>
        <div className="app-content">
          <Sidebar />
          <Routes>

          </Routes>
        </div> 
    </div>
  )
}

export default App
