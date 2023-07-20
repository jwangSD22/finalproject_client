import React from 'react'
import axios from 'axios'
import config from '../helper/config'

function Pending({thisUserPending,handleRemovePending,setToggle,toggle}) {

  const dynamicPendingButton = (userid,status) => {

    const accepted = status==='accepted'?true:false
    const disabledStatus = status==='waiting'?true:false
    const pendingStatus = status==='pending'?true:false


    const handlePendingAction = async (param) => {

      const response = await axios.post(`${config.backendServer}/api/user/handlerequest`,{param:param,endUserID:userid})


      if (param === 'reject') {
        handleRemovePending(userid); // Remove the item from the parent component's state
      }

      if (param ==='accept'){
        setToggle(!toggle)
      }

      if(response.status===200){
        console.log('SUCCESS')
      }

      

    }

    return accepted?
    <>'has accepted your friend request!'<div><button onClick={()=>handlePendingAction('close')}>close</button></div></>
    :pendingStatus?
    <><button onClick={()=>handlePendingAction('accept')}>accept</button><button onClick={()=>{handlePendingAction('reject')}}>reject</button></>
    :<button disabled={disabledStatus?true:false}>{status}</button>


  }



  const buildPending = () => {
    return thisUserPending.map(item=>
    <div key={item._id} style={{display:'flex',justifyContent:"space-between", padding:"5px"}}>
      <div>ICON</div><div> {item.fullName} </div ><div>{dynamicPendingButton(item._id,item.status)}</div> 
    </div>
    )
  }



  return (
    <div>
      <div><h2>PENDING REQUESTS</h2></div>
      <div>{buildPending()}</div>
      </div>
  )
}

export default Pending
