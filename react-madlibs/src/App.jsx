import { useState } from 'react'
import './App.css'
import MadlibsForm from "./MadlibsForm.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <MadlibsForm />
    </>
  )
}

export default App
