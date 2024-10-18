import React, { useContext } from 'react'
import { LogOut } from 'react-feather'
import { AuthContext } from '../context/AuthContext'
const Header = () => {

    const {user,handleUserLogOut} = useContext(AuthContext)
  return (
    <div id = "header--wrapper">
        { user ? (

            <>
             welcome {user.name}
               <LogOut onClick={handleUserLogOut} className='header--link'/>
            </>
        ):(
           <button>Login</button>
        
        )}

        
    </div>
  )
}

export default Header