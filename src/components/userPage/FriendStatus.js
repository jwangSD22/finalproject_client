import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { CheckOutlined, UserAddOutlined } from "@ant-design/icons";
import './friendreqbtns.css'

//friend represents the data of the individual friend inside a map of the parent component

//myfriends is a hash table containing all of your current friend data

// case - 1 - if my ID === friend._ID  --- need to not display anything

// case - 2 - if friend._id not present in myFriends hash,, -- give option to add friend

// case - 3 - if friend._id is present in myFriends hash, but status is waiting,, give option to cancel 

// reference back to user page top banner logic

// case - 4 - if friend._id is present in myFriends hash and is 'accepted', then it should show we are friends already

// case - 5 - if friend.id is present in myFriends hash and is 'pending', meaning, it's still waiting for your decision

function FriendStatus({friend,myFriends,myData}) {

    const { username } = useParams();
    const [display,setDisplay] = useState([])



    useEffect(()=>{

        if(myData.username!==username){

      
        //case 1
        if(friend._id===myData._id){
           return setDisplay([])
        }
        //case 2
        if(!myFriends[friend._id]){
            return setDisplay(<button className="btn btn-sm  btn-primary" ><span className="friend-req-btns"><UserAddOutlined className="mx-1" />Add Friend</span></button>)
        }

        //case 3
        if(myFriends[friend._id]==='waiting'){
            return setDisplay(<button className="btn btn-sm  btn-secondary disabled"><span className="friend-req-btns"><UserAddOutlined className="mx-1" /> Pending</span></button>)
        }

        //case 4
        if(myFriends[friend._id]==='accepted'){
            return setDisplay(<button className="btn btn-sm btn-outline-primary mx-2 disabled"><span className="friend-req-btns"><CheckOutlined className="mx-1" />Friend</span></button>)
        }

        //case 5
        if(myFriends[friend._id]==='pending'){
            return setDisplay(<button className="btn btn-sm  btn-secondary disabled"><span className="friend-req-btns"><UserAddOutlined className="mx-1" /> Pending </span></button>)
        }

       
        else{
            return setDisplay(<button className="btn btn-sm btn-danger mx-2 disabled"><span className="friend-req-btns">Status Error</span></button>)
        }
        }
        
        else{
            return setDisplay (<button className="btn btn-sm btn-outline-primary mx-2 disabled"><span className="friend-req-btns"><CheckOutlined className="mx-1" />Friend</span></button>)
        }



    },[])



  return (
    <>{display}</>
  )
}

export default FriendStatus
