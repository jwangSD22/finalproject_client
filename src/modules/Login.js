import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
const token = localStorage.getItem('jwt');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState(null)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
       const checkLogin = async () => {
        let response = await axios.get('/api/users/loginstatus')
        console.log('checking logged in status')
        if(response.status){
            setUser(response.data.user.jwtusername)
            setIsLoggedIn(true)
        }
    }
       checkLogin()
    },[])
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      //axios the submission, if verfiied, then server will send back something and then use react to set USER
        try{
            const response = await axios.post('/api/users/login',{email,password})
            if(response.status===200){
                console.log(response)
                localStorage.setItem('jwt',response.data.token)
                setUser(response.data.jwtusername)
            }
            window.location.reload();

            
        }
        // 401 error found on catch
        //err.response.status === 401
        //err.response.data is JSON
        
        catch (err){

            console.log(err.response.data)
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false)
        setEmail(null);
        setPassword(null);
        localStorage.removeItem('jwt')
        window.location.reload();

      }



    // testing GET /api/users  --> gets all users
    const getUsers = async () => {
        try{
            let response = await axios.get('api/users')
            console.log(response.data)
        }
        catch(err){
            console.log(err.response)
        }
    }


    //decodes JSON web token PAYLOAD after LOGIN
    const decodePayload = () => {
        const token = localStorage.getItem('jwt')
        const [header,payload,signature]=token.split('.')
        //could also use token.split('.')[1] here
        const decoded = JSON.parse(atob(payload));

        console.log(decoded)
    }
    
  

    return (

isLoggedIn?<>
<div>welcome back {user}
<br />
<br />
<button onClick={getUsers}>GET USERS</button>
<button onClick={decodePayload}>DECODE PAYLOAD</button>
<button onClick={()=>{navigate('/createpost')}}>CREATE POST</button>
</div>
<br />
<br />
<button onClick={handleLogout}>LOGOUT</button></>
:
<div>
<form onSubmit={handleSubmit}>
<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
<button type="submit">Login</button>
</form>
<br />
<button onClick={getUsers}>TEST GET USERS WITHOUT JWT</button>

</div>

 




    );

}

export default Login