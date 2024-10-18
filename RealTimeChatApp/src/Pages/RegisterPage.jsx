
import React,{useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
const RegisterPage = () => {

  const {handleUserRegister}=useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        name:'',
        email:'',
        password1:'',
        password2:'',
    })

    const handleInputChange =(e)=>{
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials,[name]:value})
        console.log(credentials)
       
    }
  return (
    <div className='auth--container'>
    <div className='form--wrapper'>
        <form onSubmit={(e)=>{handleUserRegister(e,credentials)}}>

          <div className='field--wrapper'>
              <label>Name:</label>
              <input type="text" 
                required
                name='name'
                placeholder='Enter your name...'
                value={credentials.name} 
                onChange={handleInputChange}
           />
         </div>
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
            <label>Password:</label>
               <input type="password" 
                      required
                     name='password1'
                     placeholder='Enter your password...'
                     value={credentials.password1} 
                    onChange={handleInputChange}
              />
          </div>

          <div className='field--wrapper'>
            <label>Conform Password:</label>
               <input type="password" 
                      required
                     name='password2'
                     placeholder='Enter your password...'
                     value={credentials.password2} 
                    onChange={handleInputChange}
              />
          </div>

        <div className='field--wrapper'>
          
           <input type='submit' className='btn btn--lg btn--main' value="Login"/>
           
        </div>
      
       </form>
       <p>Already have account ? Login <Link to='/login'>here</Link> </p>
    </div>
  </div>
  )
}

export default RegisterPage