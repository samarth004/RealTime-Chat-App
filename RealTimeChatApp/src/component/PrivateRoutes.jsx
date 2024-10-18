import React, { useContext } from 'react'
import { Outlet,Navigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

export const PrivateRoutes = () => {
    const {user} = useContext(AuthContext)
  return (
    <>
     {user ? <Outlet/> : <Navigate to= '/login'/>}

    </>
  )
}

