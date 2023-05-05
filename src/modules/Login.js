import React, { useState } from 'react';
import axios from 'axios';
const token = localStorage.getItem('jwt');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState(null)
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      //axios the submission, if verfiied, then server will send back something and then use react to set USER
        try{
            const response = await axios.post('/api/users/login',{email,password})
            if(response.status===200){
                localStorage.setItem('jwt',response.data.token)
                setUser(response.data.username)
            }
            
        }
        // 401 error found on catch
        //err.response.status === 401
        //err.response.data is JSON
        
        catch (err){

            console.log(err.response.data)
        }
    };

    const handleLogout = () => {
        setUser(null);
        setEmail(null);
        setPassword(null);
        localStorage.removeItem('jwt')
      }



    // testing GET /api/users  --> gets all users
    const getUsers = async () => {
        try{
            let response = await axios.get('api/users')
            console.log(response.data)
        }
        catch(err){
            console.log(err)
        }
    }


    //decodes JSON web token PAYLOAD after LOGIN
    const decodePayload = () => {
        const token = localStorage.getItem('jwt')
        const [header,payload,signature]=token.split('.')
        const decoded = JSON.parse(atob(payload));

        console.log(decoded)
    }
  

    return (

        
user?<><div>welcome back {user}
<br />
<br />
<button onClick={getUsers}>GET USERS</button>
<button onClick={decodePayload}>DECODE PAYLOAD</button>
</div>
<br />
<br />
<button onClick={handleLogout}>LOGOUT</button></>:
<form onSubmit={handleSubmit}>
<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
<button type="submit">Login</button>
</form>


    );

}

export default Login