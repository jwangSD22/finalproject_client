import React, {useEffect,useState} from 'react'
import { useParams, useOutletContext } from "react-router-dom";

//YOU ARE HITTING API with GET '/api/users/:username'
//MAKE SURE PARAMS IS A USERNAME

function User() {

    const {username} = useParams()

  return (
    <div>username</div>
  )
}

export default User