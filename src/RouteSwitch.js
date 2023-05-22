import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import App from './App'
import NewPost from './modules/NewPost'
import ChatRoom from './modules/ChatRoom'
import Users from './modules/Users'


function RouteSwitch() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<App />} />
      <Route path ="/createpost" element = {<NewPost />} />
      <Route path='/chatroom/' element = {<ChatRoom />} />
      <Route path='/users/' element = {<Users />} />
    </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch