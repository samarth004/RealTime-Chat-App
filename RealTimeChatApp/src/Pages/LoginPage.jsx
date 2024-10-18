import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {

    const navigate = useNavigate()
    const {user,handleUserLogin} = useContext(AuthContext)

    const [credentials,setCredentials] = useState(
        {
            email: '',
            password:''
           }
    )

    useEffect(()=>{
        if (user) {
            navigate('/')
        }
    },[])

    const handleInputChange =(e)=>{
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials,[name]:value})
        console.log(credentials)
       
    }
  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
          <form onSubmit={(e)=>{handleUserLogin(e,credentials)}}>
            <div className='field--wrapper'>
                <label>Email:</label>
                <input type="email" 
                   required
                   name='email'
                   placeholder='Enter your email...'
                    value={credentials.email} 
                    onChange={handleInputChange}
                />
            </div>

            <div className='field--wrapper'>
              <label>password:</label>
                 <input type="password" 
                        required
                       name='password'
                       placeholder='Enter your password...'
                       value={credentials.password} 
                      onChange={handleInputChange}
                />
         </div>

          <div className='field--wrapper'>
            
             <input type='submit' className='btn btn--lg btn--main' value="Login"/>
             
          </div>
        
         </form>
         <p>Don't have account yet? Register <Link to='/register'>here</Link> </p>
      </div>
    </div>
  )
}

