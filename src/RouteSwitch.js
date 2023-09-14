import React from "react";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Friends from "./pages/Friends.js";
import User from "./pages/User.js";

//all of the below were used in backend testing//
import App from "./App.js";
import NewPost from "./modules/NewPost.js";
import ChatRoom from "./modules/ChatRoom.js";
import Users from "./modules/Users.js";
import ErrorPage from "./pages/ErrorPage.js";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        {/**/}
        <Route path="/" element={<Login />} />

        {/*Home will display all friends' posts and have suggested contacts and contacts */}
        <Route path="/home" element={<Home />} />

        {/*Profile Route will display all of your personal posts */}
        <Route path="/profile" />

        {/*Friend Route will display all friends and pending requests */}
        <Route path="/friends" element={<Friends />} />

        <Route path="/user/:username" element={<User />} />


{/*     OLD ROUTES USED FOR TESTING
        <Route path="/app" element={<App />} />
        <Route path="/createpost" element={<NewPost />} />
        <Route path="/chatroom/" element={<ChatRoom />} />
        <Route path="/users/" element={<Users />} />
        <Route path="/error" element={<ErrorPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
