import React, { useState, useEffect, useRef } from "react";
import MainPreview from "./MainPreview";
import ConnectedChat from "./ConnectedChat";
import FriendList from "./FriendList";
import { MenuOutlined,ArrowLeftOutlined } from "@ant-design/icons";
import "./messenger.css";
import axios from "axios";

function Messenger({
  thisUsername,
  setMessengerOn,
  messengerOn,
  data,
  friends,
  userID,
}) {
  const [chatConnected, setChatConnected] = useState(false);
  const [displayFriends, setDisplayFriends] = useState(false);
  const [username1, setUsername1] = useState(thisUsername);
  const [username2, setUsername2] = useState(null);
  const [roomID, setRoomID] = useState(null);
  const [socket, setSocket] = useState(null);

  const divRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setDisplayFriends(false);
      }
    };
    if (displayFriends) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 500);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [displayFriends]);

  const handleUnmount = () => {
    if (socket) {
      console.log("active socket unmounted and disconnected");
      socket.disconnect();
      setSocket(null);
      setRoomID(null);
    }
    setChatConnected(false);
  };

  return (
    <div className="messenger container-fluid overflow-auto">
      <div
        className="friendOverlay animate__animated animate__fadeIn animate__faster"
        style={displayFriends ? { display: "block" } : { display: "none" }}
      >
        {" "}
        overlay
      </div>

      <div className="messenger-top row">
        <div className="col-1">
          {!chatConnected?
          <MenuOutlined
            className="m-2"
            onClick={() => {
              setDisplayFriends(!displayFriends);
            }}/>
          :
          <ArrowLeftOutlined 
          className="m-2"
          style={{fontSize:'20px'}}
          onClick={() => {
            handleUnmount();
          }}
          
          />
          

          }
        </div>

        <div className="col-10 my-1 d-flex justify-content-center align-items-center">
          Messenger{" "}
        </div>

        <div className="col-1 d-flex justify-content-center align-items-center">
          <button
            className="btn-close"
            onClick={() => {
              setMessengerOn(false);
              handleUnmount();
            }}
          ></button>
        </div>
      </div>


      <div>
        <div
          className="friendList animate__animated animate__slideInLeft animate__faster"
          ref={divRef}
          style={displayFriends ? { display: "block" } : { display: "none" }}
        >
          <FriendList
            friends={friends}
            setUsername2={setUsername2}
            setChatConnected={setChatConnected}
            setDisplayFriends={setDisplayFriends}
            setRoomID={setRoomID}
            username1={username1}
          />
        </div>

        {chatConnected ? (
          <>
            <ConnectedChat
              username1={username1}
              userID={userID}
              username2={username2}
              setChatConnected={setChatConnected}
              chatConnected={chatConnected}
              roomID={roomID}
              setRoomID={setRoomID}
              socket={socket}
              setSocket={setSocket}
            />
          </>
        ) : (
          <MainPreview
            data={data}
            setUsername2={setUsername2}
            chatConnected={chatConnected}
            setChatConnected={setChatConnected}
            setRoomID={setRoomID}
            username1={username1}
          />
        )}
      </div>
    </div>
  );
}

export default Messenger;
