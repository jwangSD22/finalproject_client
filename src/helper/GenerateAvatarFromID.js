import React,{useEffect,useState} from 'react'
import axios from 'axios'
import emptyAvatar from '../images/empty_avatar.png'


function GenerateAvatarFromID({userID}) {

    const [data,setData] = useState(null)

    useEffect(()=>{
        
        const getURL = async () => {
            const response = await axios.get(`/api/users/pfp/${userID}`)
            setData(response.data)
        }

        getURL()

    },[userID])

    if(data){
        let url = data.profilePhotoURL
        let activeURL = null
        if(url!=='NO PROFILE PHOTO'){
        activeURL=url
        }
        
        let style = {
            border:'solid 1px black',
            width:'35px',
            height:'35px',
            borderRadius:'50%'
        }
        
        
          return (
        <img className="mx-2" style={style} src={activeURL||emptyAvatar} />  )
    }    


        
    }

export default GenerateAvatarFromID
