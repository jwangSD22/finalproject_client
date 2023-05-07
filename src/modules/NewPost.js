import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'



function NewPost() {

    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [user,setUser] = useState(null)
    const navigate = useNavigate()



    useEffect(()=>{
        const checkLogin = async () => {
         try{
            let response = await axios.get('/api/users/loginstatus')
            console.log(response)
   
            if(response.status===200){
                console.log('logged in already')
                setIsLoggedIn(true)
                return true
            }
         }
         catch(err){
            console.log(err)
            return navigate('/')
         }
  

     }
     checkLogin()

     },[])




  return (
    isLoggedIn?<div>POST PAGE</div>:<>not logged in</>



)

}

export default NewPost