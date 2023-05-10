import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import App from './App'
import NewPost from './modules/NewPost'
import ChatRoom from './modules/ChatRoom'


function RouteSwitch() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<App />} />

      <Route path ="/createpost" element = {<NewPost />} />
      <Route path='/chatroom/' element = {<ChatRoom />} />

    </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch