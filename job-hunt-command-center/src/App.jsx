import { useState } from 'react'
import './App.css'
import Dashboard from './pages/dashboard'
import Application from './pages/application'
import ApplicationForm from './pages/ApplicationForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
            <Dashboard/>
           <Application/>
    </>
  )
}

export default App
