import React , {useState,useEffect,useRef} from 'react'
import MainPreview from './MainPreview'
import ConnectedChat from './ConnectedChat'
import FriendList from './FriendList'
import axios from 'axios'


function Messenger({thisUsername,setMessengerOn,data,friends,userID}) {

    const [chatConnected,setChatConnected] = useState(false)
    const [displayFriends,setDisplayFriends] = useState(false)
    const [username1, setUsername1] = useState(thisUsername);
    const [username2, setUsername2] = useState(null);
    const [roomID,setRoomID] = useState(null)



    const divRef = useRef(null);

    useEffect(()=>{
      console.log('this remounts MESSENGER')
    })


    useEffect(() => {
      const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
          setDisplayFriends(false)
        }
      };
      if(displayFriends){
        setTimeout(()=>{        document.addEventListener('click', handleClickOutside);
      },500)
      }
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [displayFriends]);  

    const findRoom = async () => {
      try {
      if (username1 && username2) {
        let response = await axios.post("/api/chats", {
          username2,
        });
        console.log(response.data.chatid)
        setRoomID(response.data.chatid);
        return response.data.chatid;
      }
    } catch (err) {
      if (err.response.status === 400) {
        console.log(err.response)
        return null;
      }
    }
  };



    

    //username 1 is ME
    //username 2 -- if set, should trigger main content to show the chat 

  return ( 
    <div className='messenger container-fluid overflow-auto'>
                  <div className='friendOverlay animate__animated animate__fadeIn animate__faster' style={displayFriends?{display:'block'}:{display:'none'}}> overlay</div>

        <div className='d-flex justify-content-center'>Messenger //// and maximize button<button className='btn-close' onClick={()=>{setMessengerOn(false)}}></button><button onClick={()=>{setDisplayFriends(!displayFriends)}}>F</button></div>
        {chatConnected??<div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>}

        <div> 
            <div className='friendList animate__animated animate__slideInLeft animate__faster' ref={divRef} style={displayFriends?{display:'block'}:{display:'none'}} >
              <FriendList friends={friends} setUsername2={setUsername2} setChatConnected={setChatConnected} setDisplayFriends={setDisplayFriends} setRoomID={setRoomID} username1={username1}  />
            </div>


    

            
            {chatConnected?<><ConnectedChat username1={username1} userID={userID} username2={username2} setChatConnected={setChatConnected} chatConnected={chatConnected} roomID={roomID}/></>
            :
            <MainPreview data={data} setUsername2={setUsername2} chatConnected={chatConnected} setChatConnected={setChatConnected} setRoomID={setRoomID} username1={username1}  />}
            
             </div>
       
    </div>
  )
}

export default Messenger
