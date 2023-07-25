import React, { useState, useEffect, useRef } from "react";
import MainPreview from "./MainPreview";
import ConnectedChat from "./ConnectedChat";
import FriendList from "./FriendList";
import { MenuOutlined,ArrowLeftOutlined } from "@ant-design/icons";
import "./messenger.css";
import emptyAvatar from '../../src/images/empty_avatar.png'


function Messenger({thisUsername,setMessengerOn,data,friends,userID,}) {

  const [chatConnected, setChatConnected] = useState(false);
  const [displayFriends, setDisplayFriends] = useState(false);
  const [username2, setUsername2] = useState(null);
  const [connectedFriendData,setConnectedFriendData] = useState(null)
  const [roomID, setRoomID] = useState(null);
  const [socket, setSocket] = useState(null);

  const divRef = useRef(null);

  useEffect( () => {

    if(friends){
      const filteredArray = friends.filter(item=>item.username===username2)
      setConnectedFriendData(filteredArray[0])
    }


  },[friends,username2]) 



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
      socket.disconnect();
      setSocket(null);
      setRoomID(null);
    }
    setChatConnected(false);
  };

  return (
    <div className="messenger container-fluid overflow-hidden">

      <div
        className="friendOverlay animate__animated animate__fadeIn animate__faster"
        style={displayFriends ? { display: "block" } : { display: "none" }}>
        
        {/* Overlay when friend-list is active */}
      
      </div>

        <div className="messenger-header row">
          <div className="col-1"
           >
            {!chatConnected?
            <div className="friends-menu"
            onClick={() => {
              setDisplayFriends(!displayFriends);
            }}>
              <MenuOutlined
              className="m-2"/>
              </div>

            :
            <div className="friends-menu "
            onClick={() => {
              handleUnmount();
            }}>
               <ArrowLeftOutlined
            className="m-2"
            style={{fontSize:'20px'}}

        
            />
              </div>
           
            }
          </div>
          <div className="col-10 my-1 d-flex justify-content-center align-items-center">
            {chatConnected&&connectedFriendData?
            <div className="d-flex align-items-center justify-content-center">
              <div className=""><img className='pfp-msger-preview' alt='pfp-msger-preview' src={connectedFriendData.friendPhotoURL==='NO PROFILE PHOTO'?emptyAvatar:connectedFriendData.friendPhotoURL} /></div>
              <div className="mx-3">{connectedFriendData.fullName}</div>
              </div>
              :
              'Messenger'}
          </div>
          <div className="col-1 d-flex justify-content-center align-items-center">
            <button
              className="btn-close btn-close-white"
              onClick={() => {
                setMessengerOn(false);
                handleUnmount();
              }}
            ></button>
          </div>
      </div>



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
            username1={thisUsername}
          />
        </div>

        {chatConnected ? (
     
            <ConnectedChat
              username1={thisUsername}
              userID={userID}
              username2={username2}
              setChatConnected={setChatConnected}
              chatConnected={chatConnected}
              roomID={roomID}
              setRoomID={setRoomID}
              socket={socket}
              setSocket={setSocket}
            />
   
        ) : (
          <MainPreview
            data={data}
            setUsername2={setUsername2}
            chatConnected={chatConnected}
            setChatConnected={setChatConnected}
            setRoomID={setRoomID}
            username1={thisUsername}
          />
          
          
        )}
 
    </div>
  );
}

export default Messenger;
