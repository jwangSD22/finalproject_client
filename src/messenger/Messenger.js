import React , {useState,useEffect} from 'react'
import ChatRoom from '../modules/ChatRoom'

function Messenger({thisUsername}) {

    const [chatConnected,setChatConnect] = useState(false)

    //username 1 is always present
    //username 2 -- if set, should trigger main content to show the chat 

  return ( 
    <div className='messenger container-fluid overflow-auto'>
        <div className='d-flex justify-content-center'>Messenger // needs a close button // and maximize button</div>
        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>
        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>

        <div className='d-flex justify-content-center'>USER NAME DIV / shows up if CONNECTED</div>



        <div> MAIN CONTENT
            
            jsx : !chatConnected? Mount preview module : Mount chat module with user2
            
            
             </div>
        <ChatRoom />
    </div>
  )
}

export default Messenger
