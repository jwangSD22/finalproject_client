import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../helper/config.js";
import io from "socket.io-client";
const token = localStorage.getItem("jwt");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const ChatRoom = () => {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [roomID, setRoomID] = useState(null);

  //from my login component//
  const [userID, setUserID] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        let response = await axios.get(
          `${config.backendServer}/api/users/loginstatus`
        );
        if (response.status === 200) {
          // setUser(response.data.user.jwtusername);
          setUserID(response.data.user.jwtid);
          setUsername1(response.data.user.jwtusername);
          // setIsLoggedIn(true);
          return true;
        }
      } catch (err) {
        console.log(err);
        return navigate("/");
      }
    };
    checkLogin();
  });

  useEffect(() => {
    if (socket) {
      // Listen for new messages from the server and update the state
      socket.on("newMessage", (message) => {
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  // Get UUID of chat room using the two usernames
  const findRoom = async () => {
    try {
      if (username1 && username2) {
        let response = await axios.post(`${config.backendServer}/api/chats`, {
          username2,
        });
        console.log(response.data);
        setRoomID(response.data.chatid);
        return response.data.chatid;
      }
    } catch (err) {
      if (err.response.status === 400) {
        return null;
      }
    }
  };

  //Connect to that private room using the ID from findRoom()
  const handleConnectClick = async () => {
    let temproomID = null;
    try {
      const room = await findRoom();
      temproomID = room;
      setRoomID(room);
      if (room === false) {
        return console.log("join room failed");
      } else {
        const socket = io("http://localhost:3000/", {
          path: "/socketio",
        });
        setSocket(socket);
        socket.emit("join-room", room);
        console.log(socket);
      }
    } catch (err) {
      console.log(err);
    }

    //load messages into the message container
    try {
      const messageData = await axios.get(
        `${config.backendServer}/api/chats/${temproomID}/messages`
      );
      //axios GET the convo with a body including the roomid
      setMessages(messageData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the new message to the server and update the state
    if (newMessage) {
      socket.emit("sendMessage", {
        roomID: roomID,
        userid: userID,
        username: username1,
        text: newMessage,
      });
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
        <button disabled={!!socket} onClick={handleConnectClick}>
          Connect
        </button>

        <button
          disabled={!socket}
          onClick={() => {
            if (!socket) {
              return console.log("currently not connected");
            }
            //disconnect and remove socket to stop the connection from frontend
            //disconnect accepts a parameter as a message to the backend
            socket.disconnect();
            setSocket(null);
            setMessages([]);
            console.log("disconnected from socketio");
          }}
        >
          Disconnect
        </button>
      </div>
      <div>
        {messages.map((message) => (
          <div key={message.messageID}>
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
