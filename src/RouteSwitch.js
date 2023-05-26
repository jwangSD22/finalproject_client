import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Friends from './pages/Friends'

//all of the below were used in backend testing//
import App from './App'
import NewPost from './modules/NewPost'
import ChatRoom from './modules/ChatRoom'
import Users from './modules/Users'
import Test from './Test'


function RouteSwitch() {
  
  return (
    <BrowserRouter>
    <Routes>

      {/**/}      
      <Route path = "/" element={<Login />}/> 

      {/*Home will display all friends' posts and have suggested contacts and contacts */}
      <Route path = "/home" element={<Home />}/> 

      {/*Profile Route will display all of your personal posts */}      
      <Route path = "/profile" /> 

      {/*Friend Route will display all friends and pending requests */}      
      <Route path = "/friends" element={<Friends />} /> 



      <Route path ="/app" element={<App />} /> 
      <Route path ="/createpost" element = {<NewPost />} />
      <Route path='/chatroom/' element = {<ChatRoom />} />
      <Route path='/users/' element = {<Users />} />


      <Route path='/test/' element = {<Test />} />


    </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch