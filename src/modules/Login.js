import React, { useState } from 'react';
import axios from 'axios';

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
        catch (error){
            console.log(error)
        }
    };

    const handleLogout = () => {
        setUser(null);
        setEmail(null);
        setPassword(null);
        localStorage.removeItem('jwt')
      }
  
    return (
user?<><div>welcome back {user}</div>
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