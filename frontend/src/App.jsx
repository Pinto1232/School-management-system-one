import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../.././frontend/src/pages/Home"
import Login from "../.././frontend/src/pages/Login"
import Signup from "../.././frontend/src/pages/Signup"
import Navbar from "../src/components/specific/Navbar"
import AuthForm from './components/specific/AuthForm'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<AuthForm />} />
        {/* <Route path="/register" element={<AuthForm />} /> */}
      </Routes>
    </div>
  )
}

export default App
