import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'

const App = () => {
  return (
    <> 
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
