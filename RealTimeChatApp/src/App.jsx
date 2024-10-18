import { useState } from 'react'
import Room from './Pages/Room'
import {PrivateRoutes} from './component/PrivateRoutes'
import './App.css'
import { LoginPage } from './Pages/LoginPage'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RegisterPage from './Pages/RegisterPage'

function App() {
 
 
  return (
    <Router>
         <AuthProvider>
           <Routes>
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>} />
                 <Route element={<PrivateRoutes/>}>
                  <Route path='/' element={<Room/>}/>
              </Route>
           </Routes>
       </AuthProvider>
    </Router>
  )
}

export default App
