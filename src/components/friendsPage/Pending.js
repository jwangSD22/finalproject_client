import emptyAvatar from '../../images/empty_avatar.png'
import axios from 'axios'
import React from 'react'
import {useNavigate} from 'react-router-dom'

import '../../pages/Friends.css'

function Pending ({data,setPendingActionToggle,pendingActionToggle,setAcceptFriendToggle,acceptFriendToggle}){
    const navigate = useNavigate();

    
    const handleNav = (username) => {
        navigate(`/user/${username}`);window.location.reload()
      }  

    const generateFromStatus = (param,endUserID) =>{

        const handleUpdate = async (decision) => {
       
                await axios.post(`/api/user/handlerequest`,{param:decision,endUserID:endUserID})
  
                setPendingActionToggle(!pendingActionToggle)

                if(decision==='accept'){
                    setAcceptFriendToggle(!acceptFriendToggle)
                }
        }

        const handleRemoveRequest = async () => {
                await axios.post(`/api/user/removefriendrequest`,{endUserID:endUserID})
                setPendingActionToggle(!pendingActionToggle)

        }

        switch(param){
            case 'pending':
                return <div className='d-flex flex-column friend-btn-container'>
                <button className='btn btn-primary my-1' onClick={()=>{handleUpdate('accept')}}>Accept</button>
                <button className='btn btn-outline-danger' onClick={()=>{handleUpdate('reject')}}>Reject</button>
                </div>

            

            case 'waiting':
                return <div className='d-flex flex-column friend-btn-container'>
                <button className='btn btn-secondary disabled my-1'>Request sent</button>
                <button className='btn btn-danger' onClick={handleRemoveRequest}>Cancel request</button>
                </div>
            

            case 'accepted':
                return <div className='d-flex flex-column friend-btn-container'>
                <button className='btn btn-success my-1'>Friend accepted!</button>
                <button className='btn btn-outline-secondary' onClick={()=>{handleUpdate('close')}}>Close</button>
                </div>

            default:
                console.log('error - no parameter')
            
        }
        


        return <div>{param}</div>
    }

    return (
<div className=" col-6 col-xs-4 col-md-4 col-lg-3 col-xxl-2 d-flex flex-column my-2 align-items-center" key={data._id}>
<div className="shadow-sm friend-container " onClick={()=>{handleNav(data.username)}}>
<img className="friend-container-img" alt='friend-container-img' src={data.profilePhotoURL==='NO PROFILE PHOTO'?emptyAvatar:data.profilePhotoURL}/>
<div className="friend-name mt-auto"onClick={()=>{handleNav(data.username)}}>{data.fullName}</div>
</div>
{generateFromStatus(data.status,data._id)}

</div>
        )
}

export default Pending
