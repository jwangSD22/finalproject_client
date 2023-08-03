import React from 'react'
import {Routes, Route, BrowserRouter,HashRouter} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Friends from './pages/Friends'
import User from './pages/User'

//all of the below were used in backend testing//
import App from './App'
import NewPost from './modules/NewPost'
import ChatRoom from './modules/ChatRoom'
import Users from './modules/Users'
import ErrorPage from './pages/ErrorPage'
import Stormdoor from './modules/Stormdoor'


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

      <Route path = "/user/:username" element = {<User />}/>
      

      
      <Route path ="/stormdoor" element = {<Stormdoor />} />
      {/* use outlet from react router dom to handle nav between posts and friends? */}

        



      <Route path ="/app" element={<App />} /> 
      <Route path ="/createpost" element = {<NewPost />} />
      <Route path='/chatroom/' element = {<ChatRoom />} />
      <Route path='/users/' element = {<Users />} />
      <Route path ='/error' element = {<ErrorPage />} />




    </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch
