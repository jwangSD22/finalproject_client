import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import io from "socket.io-client";
const token = localStorage.getItem('jwt');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


const ChatRoom = () => {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [roomID,setRoomID] = useState(null)

  //from my login component// 
  const [user,setUser] = useState(null)
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get("/api/users/loginstatus");
        if (response.status === 200) {
          setUser(response.data.user.jwtusername);
          setUsername1(response.data.user.jwtusername);
          setIsLoggedIn(true);
          return true;
        }
      } catch (err) {
        console.log(err);
        return navigate("/");
      }
    };
    checkLogin();
  }, []);

  // useEffect(() => {
  //   // Connect to the Socket.io server
  //   const newSocket = io("http://localhost:3000");
  //   setSocket(newSocket);

  //   // Disconnect the socket when the component unmounts
  //   return () => newSocket.disconnect();
  // }, []);

  // useEffect(() => {
  //   // Axios all messages from the database and update the state
  //   const fetchMessages = async () => {
  //     const response = await fetch("/api/messages");
  //     const data = await response.json();
  //     setMessages(data);
  //   };

  //   fetchMessages();
  // }, []);

  useEffect(() => {
    if (socket) {
      // Listen for new messages from the server and update the state
      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const handleConnectClick = async () => {
    // Get UUID of chat room using the two usernames
    try{
      if (username1 && username2) {
        let response = await axios.post('http://localhost:3000/api/chats',
          {username2}
        )
        console.log(response.data)
        setRoomID(response.data.chatid)
      }
    }
    catch(err){
      console.log(err)
    }

    //Connect to that private room using the ID
    try{
      const socket = io('http://localhost:3000/',{
        path:'/socketio'
      });
      setSocket(socket);
      console.log(socket)
      socket.emit('join-room',roomID)
    }
    catch(err){
      console.log(err)
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the new message to the server and update the state
    if (newMessage) {
      socket.emit("sendMessage", { text: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="username1">Username 1:</label>
        <input
          type="text"
          id="username1"
          value={username1}
          onChange={(event) => setUsername1(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username2">Username 2:</label>
        <input
          type="text"
          id="username2"
          value={username2}
          onChange={(event) => setUsername2(event.target.value)}
        />
        <button onClick={handleConnectClick}>Connect</button>
        <button onClick={()=>{socket.disconnect();console.log('disconnected from socketio')}}>Disconnect</button>

      </div>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            <strong>{message.username}:</strong> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChatRoom;
