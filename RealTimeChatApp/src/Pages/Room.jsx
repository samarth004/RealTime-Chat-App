import React,{ useContext, useEffect, useState } from 'react'
import {conf} from '../confVariable/conf'
import {databases,client} from '../appwrite/appWrite'
import { ID ,Query,Role,Permission} from 'appwrite'
import{Trash2} from 'react-feather'
import Header from '../component/Header'
import { AuthContext } from '../context/AuthContext'


const Room = () => {
    
   const[messages,setMessages] = useState([]);
   const[messageBody,setMessageBody] = useState('')
   const{user } = useContext(AuthContext)
 
    useEffect(()=>{
            getMessages()

          const unsubscribe=  client.subscribe(`databases.${conf.appwriteDatabaseId}.collections.${conf.appWriteCollectionId}.documents`,response => {
            
      
               if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                  console.log("A MESSAGE WAS CREATED")
                  setMessages(prev =>[response.payload,...prev])
               }

               if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                  console.log("A MESSAGE WAS DELETED!!!!!")
                  setMessages(prev=>prev.filter(message=>message.$id !== response.payload.$id))
               }

           });

           return ()=>{
            unsubscribe();
           }
    },[])

      const handleSubmit = async(e)=>{
         e.preventDefault()

         let payload ={
             user_id:user.$id,
             username:user.name,
            body:messageBody

         }

         let permission = [
              Permission.write(Role.user(user.$id))
         ]

         let response = await databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appWriteCollectionId,
            ID.unique(),
            payload,
            permission

         )


          console.log("created",response)

           //setMessages(prev =>[response,...prev])
          
          setMessageBody(' ')

      }  

      const deleteMessage = async(message_id)=>{
           databases.deleteDocument(conf.appwriteDatabaseId,conf.appWriteCollectionId,
            message_id
           )
           //setMessages(prev=>messages.filter(message=>message.$id!==message_id))
      }
    const getMessages = async() =>{

        const response = await databases.listDocuments(conf.appwriteDatabaseId,conf.appWriteCollectionId,
         [Query.orderDesc('$createdAt'),
            Query.limit(10),
         ]
        );
        console.log("Response",response);
        setMessages(response.documents)
    }
  return (
     <main className='container'>
            <Header/>
       <div className='room--container'>
         
         <form onSubmit={handleSubmit} id='message--form'>
              <div>

                  <textarea
                   required
                   maxLength="1000"
                   placeholder='Say Something...'
                   onChange={(e)=>{setMessageBody(e.target.value)}}
                   value={messageBody}>
                  
                  </textarea> 
                   
               </div>

               <div className='send-btn--wrapper'>
                  <input className='btn btn--secondary' type="submit"  value="send"/>
               </div>
         </form>
       
      <div>
        {messages.map(message =>(

         <div key={message.$id} className='message--wrapper'>

            <div className='message--header'>
             <p>
                {message?.username?(
                  <span>{message.username}</span>
                ):(
                  <span>'Anonyomus user'</span>
                )}
                <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
             </p>
                 

             {message.$permissions.includes(`delete(\"user:${user.$id}\")`)&&(
               <Trash2
                 className='delete--btn'
               onClick={()=>deleteMessage(message.$id)}
               />
             )}

              
             
            </div>

            <div className='message--body'>
               <span>{message.body}</span>
            </div>               
          </div>
           ))}
       </div>
        
       </div>

     </main>
  ) 
}

export default Room