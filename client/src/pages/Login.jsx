import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom"
import { clearUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { cartError, cartErrorDel } from "../../features/cartSlice";
function Login() {

  const [formData,setFormData]=useState({});
  const [showError,setShowError]=useState("");
  const [success,setSuccess]=useState(false);
  const dispatch=useDispatch();
  const inputChangeHandler=(e)=>{
     setFormData({...formData,[e.target.name]:e.target.value});
     console.log(formData);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
       axios.post("http://localhost:2000/user/login",formData, {withCredentials: true}).then((response)=>{
            
           setSuccess(true);
           dispatch(cartError(""));
       }).catch((err)=>{
        setShowError(err.response.data.message);
       })
  }
  return (
    <div className="container flex h-screen items-center justify-center">
     {
      success ?
       
      <Navigate to={'/'}/>:
      ""
     }
    <div className="w-2/4 max-w-sm p-4 bg-gradient-to-r from-green-400 to-blue-500  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>
        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="username"
            required
            value={formData.username ? formData.username : ""}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            value={formData.password ? formData.password : ""}
            onChange={inputChangeHandler}
          />
          
        </div>
        <br></br>
        {
          showError ?
          <label htmlFor="error"
          className="w-full text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {showError}
          </label> : ""
        }
        
        <div className="flex items-start">
          
          <a
            href="#"
            className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            Lost Password?
          </a>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <Link to={'/registration'} href="#" className="text-blue-700 hover:underline dark:text-blue-500">
            Create account
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Login;
