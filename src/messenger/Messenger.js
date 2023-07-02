import React , {useState,useEffect,useRef} from 'react'
import ChatRoom from '../modules/ChatRoom'
import MainPreview from './MainPreview'
import ConnectedChat from './ConnectedChat'
import FriendList from './FriendList'

function Messenger({thisUsername,setMessengerOn,data,friends}) {

    const [chatConnected,setChatConnected] = useState(false)
    const [displayFriends,setDisplayFriends] = useState(false)
    const [username1, setUsername1] = useState("");
    const [username2, setUsername2] = useState("");

    const divRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
          setDisplayFriends(false)
        }
      };
      if(displayFriends){
        setTimeout(()=>{        document.addEventListener('click', handleClickOutside);
      },1200)
      }
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [displayFriends]);  


    

    //username 1 is ME
    //username 2 -- if set, should trigger main content to show the chat 

  return ( 
    <div className='messenger container-fluid overflow-auto'>
                  <div className='friendOverlay animate__animated animate__fadeIn animate__faster' style={displayFriends?{display:'block'}:{display:'none'}}> overlay</div>

        <div className='d-flex justify-content-center'>Messenger //// and maximize button<button className='btn-close' onClick={()=>{setMessengerOn(false)}}></button><button onClick={()=>{setDisplayFriends(!displayFriends)}}>F</button></div>
        {chatConnected??<div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>}

        <div> 
            <div className='friendList animate__animated animate__slideInLeft animate__faster' ref={divRef} style={displayFriends?{display:'block'}:{display:'none'}} >
              <FriendList friends={friends} setUsername2={setUsername2} setChatConnected={setChatConnected}/>
            </div>

  

            
            {chatConnected?<><ChatRoom /><ConnectedChat /></>:<MainPreview data={data} setUsername2={setUsername2} chatConnected={chatConnected} setChatConnected={setChatConnected}/>}
            
             </div>
       
    </div>
  )
}

export default Messenger
