import React,{useEffect,useState} from 'react'
import axios from 'axios'
import emptyAvatar from '../images/empty_avatar.png'


function GenerateAvatarFromID({userID,pfpHash,setPfpHash}) {

    const [data,setData] = useState(null)
    const [activeURL, setActiveURL] = useState(null)
    

    useEffect(()=>{
        


        const hash = async () => {
            try{
                if(!pfpHash.get(userID)){
        

                    const response = await axios.get(`/api/users/pfp/${userID}`)
                    setPfpHash(pfpHash.set(userID,response.data.profilePhotoURL))
                    setData(response.data.profilePhotoURL)
                }
                else{

                    setData(pfpHash.get(userID))
                }
            }
            catch(err){
                console.log(err)
            }
        }


        hash();
    },[userID])

    useEffect(()=>{ 
            let url = data
            if(url!=='NO PROFILE PHOTO'){
            setActiveURL(url)
            }      
        
    },[data])





    let style = {
        // border:'solid 1px black',
        width:'35px',
        height:'35px',
        borderRadius:'50%'
    }




    return (
        <img className="mx-2" style={style} src={activeURL||emptyAvatar} /> 

        )

        
    }

export default GenerateAvatarFromID
