import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

function ConnectedChat({username1,username2,setChatConnected,chatConnected,userID,roomID,setRoomID}) {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [roomID, setRoomID] = useState(null);
  const [socket, setSocket] = useState(null);


  useEffect(()=>{
  })

  useEffect(() => {
    if (socket) {
      console.log('triggers a new socket sense')
      // Listen for new messages from the server and update the state
      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  // useEffect(()=>{

  //       // Get UUID of chat room using the two usernames
  //       const findRoom = async () => {
  //           try {
  //           if (username1 && username2) {
  //             let response = await axios.post("/api/chats", {
  //               username2,
  //             });
  //             console.log(response.data.chatid)
  //             setRoomID(response.data.chatid);
  //             return response.data.chatid;
  //           }
  //         } catch (err) {
  //           if (err.response.status === 400) {
  //             console.log(err.response)
  //             return null;
  //           }
  //         }
  //       };

  //       //module is triggering reload twice and i can't figure out why... so how can i prevent this from creating multiple chatrooms 
  //       // instead you can make find room a non- use effect function, this would prevent triggering multiple reloads --
  //       // you would have to move setroomid to the parent component tho

  //       //you can figure out why its triggering mutlieplre loads 


  //       //is there a way i can alter the backend so it doesn't trigger this twice? 

      
  //         console.log('triggered FIND ROOM CALLED')
  //         findRoom();
 
  

    
  // })


    useEffect(()=>{

      const handleConnect = async () => {
        try {
          if (roomID === null) {
            return console.log("join room failed");
    
          } else {
            const socket = io("http://localhost:3000/", {
              path: "/socketio"
            });
            setSocket(socket);
            socket.emit("join-room", roomID);
          }
        } catch (err) {
          console.log(err);
        }
    
        //load messages into the message container
        try{
          console.log('this block is being hit')
          const messageData = await axios.get(`/api/chats/${roomID}/messages`)
          //axios GET the convo with a body including the roomid

          setMessages(messageData.data)
          
        }
        catch(err){
          console.log(err)
        }
      };



      if(!socket&&roomID){
        handleConnect();

      }
      

    },[roomID])


    const handleUnmount = () => {

      if(socket){
        console.log('active socket unmounted and disconnected')
        socket.disconnect();
        setSocket(null)
        setRoomID(null)
      }

      setChatConnected(false)


    }

    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Send the new message to the server and update the state
      if (newMessage) {
        socket.emit("sendMessage", { roomID: roomID, userid:userID, username:username1, text: newMessage });
        setNewMessage("");
      }
    };


  return (
    <div>ConnectedChat
      <button onClick={handleUnmount}>Disconnect</button>
      <button onClick={()=>{console.log(socket)}}>See socket</button>

      <div>
        {(messages).map((message) => (
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
  )
}

export default ConnectedChat
