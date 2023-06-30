import React, {useState,useEffect} from 'react'

//friend represents the data of the individual friend inside a map of the parent component

//myfriends is a hash table containing all of your current friend data

// case - 1 - if my ID === friend._ID  --- need to not display anything

// case - 2 - if friend._id not present in myFriends hash,, -- give option to add friend

// case - 3 - if friend._id is present in myFriends hash, but status is waiting,, give option to cancel 

// reference back to user page top banner logic

// case - 4 - if friend._id is present in myFriends hash and is 'accepted', then it should show we are friends already

function FriendStatus({friend,myFriends,myData}) {

    const [ID,setID] = useState('')
    const [display,setDisplay] = useState([])

    useEffect(()=>{
    setID(myData._id)        
    },[myData])

    useEffect(()=>{
        //case 1
        if(friend._id===ID){
           return setDisplay([])
        }
        //case 2
        if(!myFriends[friend._id]){
            return setDisplay(<h3>ADD FRIEND</h3>)
        }

        //case 3
        if(myFriends[friend._id]==='waiting'){
            return setDisplay(<h2>waiting</h2>)
        }

        //case 4
        if(myFriends[friend._id]==='accepted'){
            return setDisplay(<h2>already friends</h2>)
        }

       
        else{
            return setDisplay(<h2>error</h2>)
        }
    },[ID])



  return (
    <div>{display}</div>
  )
}

export default FriendStatus
