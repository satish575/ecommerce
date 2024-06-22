import React, { useEffect } from 'react'
import axios from "axios";
import {Navigate} from "react-router-dom"
import { clearUser } from '../../features/userSlice';
import {useDispatch} from "react-redux"
function Logout() {
  
  useEffect(()=>{
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    useDispatch()(clearUser());
  })
 
  return (
    <Navigate to={'/login'}></Navigate>
  )
}

export default Logout