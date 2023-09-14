import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import config from "../helper/config.js";
import io from "socket.io-client";
import "./messenger.css";
import formatTimestamp from "../helper/formatTimestampMessenger.js";
import { SendOutlined } from "@ant-design/icons";

function ConnectedChat({
  username1,
  username2,
  setChatConnected,
  chatConnected,
  userID,
  roomID,
  setRoomID,
  messengerOn,
  socket,
  setSocket,
}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [roomID, setRoomID] = useState(null);

  const messageContainerRef = useRef(null);
  const inputBox = useRef(null);

  useEffect(() => {
    if (socket) {
      // Listen for new messages from the server and update the state
      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const handleConnect = async () => {
      try {
        if (roomID === null) {
          return console.log("join room failed");
        } else {
          const socketAddress = config.backendServer;

          const socket = io(socketAddress, {
            path: "/socketio",
          });
          setSocket(socket);
          socket.emit("join-room", roomID);
        }
      } catch (err) {
        console.log(err);
      }

      //load messages into the message container
      try {
        const messageData = await axios.get(
          `${config.backendServer}/api/chats/${roomID}/messages`
        );
        //axios GET the convo with a body including the roomid
        setMessages(messageData.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (!socket && roomID) {
      handleConnect();
    }
  }, [roomID]);

  const handleSubmit = async (event) => {
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

  const handleScroll = () => {
    if (inputBox.current && window.innerWidth < 576) {
      inputBox.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="connected-chat-container">
      {/* ConnectedChat testing buttons
      <button onClick={handleUnmount}>Disconnect</button>
      <button onClick={()=>{console.log(socket)}}>See socket</button> */}

      <div className="row">
        <div
          className="message-container mt-2  d-flex flex-column"
          ref={messageContainerRef}
        >
          {messages.map((message) => (
            <div
              key={message.messageID}
              className={`${
                username1 === message.username
                  ? "right-message"
                  : "left-message"
              }`}
              style={{ wordBreak: "break-all" }}
              onClick={handleScroll}
            >
              {message.text}
              <small
                className={`mx-2 ${
                  username1 === message.username ? "right-ts" : "left-ts"
                }`}
                style={{ wordBreak: "keep-all" }}
              >
                {formatTimestamp(message.timestamp)}
              </small>
            </div>
          ))}
        </div>
      </div>

      <div className="row ">
        <form onSubmit={handleSubmit} style={{ padding: "0px" }}>
          <div className="input-text-bar" ref={inputBox}>
            <input
              type="text"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              style={{
                border: "none",
                outline: "none",
                margin: "0",
                padding: "10px",
                height: "40px",
              }}
              placeholder="Message"
              autoComplete="new-password"
            />

            <div className=" d-flex align-items-center justify-content-end">
              <button className="btn" type="submit">
                <SendOutlined
                  style={{
                    fontSize: "25px",
                  }}
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConnectedChat;
