import React , {useState,useEffect} from 'react'
import ChatRoom from '../modules/ChatRoom'
import MainPreview from './MainPreview'
import ConnectedChat from './ConnectedChat'

function Messenger({thisUsername,setMessengerOn,data}) {

    const [chatConnected,setChatConnect] = useState(false)
    const [username1, setUsername1] = useState("");
    const [username2, setUsername2] = useState("");

    

    //username 1 is ME
    //username 2 -- if set, should trigger main content to show the chat 

  return ( 
    <div className='messenger container-fluid overflow-auto'>
        <div className='d-flex justify-content-center'>Messenger // needs a close button // and maximize button<button className='btn-close' onClick={()=>{setMessengerOn(false)}}></button></div>
        {chatConnected??<div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>}

        <div> 
            <div className='friendList'>HIDDEN Friend list</div>

            
            {chatConnected?<><ChatRoom /><ConnectedChat /></>:<MainPreview data={data}/>}
            
             </div>
       
    </div>
  )
}

export default Messenger
