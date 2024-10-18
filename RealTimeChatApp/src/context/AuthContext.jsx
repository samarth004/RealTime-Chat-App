import { createContext,useState,useEffect, } from "react";
import { account } from "../appwrite/appWrite";
export const AuthContext = createContext()
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";


export const  AuthProvider = ({children}) => {
       
    const navigate = useNavigate();

    const[loading,setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(()=>{
        getUserOnLoad()
     },[])


      const getUserOnLoad = async()=>{
         try {
            const result = await account.get();
                setUser(result)
         } catch (error) {
            console.info(error)
         }
         setLoading(false)
      }
   
      
   
       const handleUserLogin = async(e,credentials)=>{
              e.preventDefault()

              try {
                const response = await account.createEmailPasswordSession(credentials.email,credentials.password)
                console.log("loggedin:",response)

                const result = await account.get();
                setUser(result)

                navigate('/')

              } catch (error) {
                console.log(error)
              }

              
       }

       const handleUserLogOut = async()=>{
           await account.deleteSession('current');
           setUser(null)
       }

       const handleUserRegister = async(e,credentials)=>{
        e.preventDefault()
        if (credentials.password1 !== credentials.password2) {
            alert('password do not match')
            return
        }

        try {
            let response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name,
                
            )

            await account.createEmailPasswordSession(credentials.email,credentials.password1)
            const result = await account.get();
                setUser(result)
                navigate('/')
                
            console.log("registered,",response)
        } catch (error) {
            console.error(error)
        }
           
       }

    
    const contextData = {
        user,
        handleUserLogin,
        handleUserLogOut,
        handleUserRegister,
    }
    

    return <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading..</p>: children}       
    </AuthContext.Provider>
}


