import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import App from './App'
import NewPost from './modules/NewPost'


function RouteSwitch() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<App />} />

  

      <Route path ="/createpost" element = {<NewPost />} />

    </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch