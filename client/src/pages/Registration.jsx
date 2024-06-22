import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Registration = () => {
    const [formData,setFormData]=useState({});
    const [passwordError,setPasswordError]=useState("");
    const [usernameError,setUsernameError]=useState("");
    const [emailError,setEmailError]=useState("");
    const [allErrors,setAllErrors]=useState("");
    const [successMsg,setSuccessMsg]=useState("");
    const inputChangeHandler=(e)=>{
       setFormData({...formData,[e.target.name]:e.target.value});
       console.log(formData);
    }
  const submitForm=async(e)=>{


      setPasswordError("");
      setUsernameError("");
      setEmailError("");
      setAllErrors("");

      e.preventDefault();
      if(formData.password!=formData.confirmpassword){
        setPasswordError("confirm password and password should match");
      }
      try {
        const registerationresponse=await axios.post("http://localhost:2000/user/registration",formData,{
          headers:{
            "Content-Type":"Application/json"
          }
        });
      
        if(registerationresponse.data.success){
          setSuccessMsg("registeration successful login to continue");
        }

      } catch (error) {
        console.log(typeof(error.response.data.message));
         if(error.response.data.message.startsWith("password")){
         setPasswordError(error.response.data.message)
         }
         else if(error.response.data.message.startsWith("username")){
         setUsernameError(error.response.data.message)
         }
         else if(error.response.data.message.startsWth("email")){
         setEmailError(error.response.data.message);
         }
         else{
         setAllErrors(error.response.data.message);
         }
      }
  }
  return (
    <div className="container flex  h-screen items-center justify-center">
    
   <div className="w-full max-w-sm p-4 bg-gradient-to-r from-green-400 to-blue-500  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <p>{allErrors?allErrors:""}</p>
    <p>{successMsg?successMsg:""}</p>
     <form className="space-y-6" onSubmit={submitForm}>
       <h5 className="text-xl font-medium text-gray-900 dark:text-white">
         Sign up to our platform
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
         <span>{usernameError?usernameError:""}</span>
          <label
           for="email"
           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
           Your email
         </label>
         <input
           type="email"
           name="email"
           id="username"
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
           placeholder="email"
           required
           value={formData.email ? formData.email : ""}
           onChange={inputChangeHandler}
         />
         <span>{emailError?emailError:""}</span>
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
         <span>{passwordError?passwordError:""}</span>
          <label
           for="password"
           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
           Confirm Password
         </label>
         <input
           type="password"
           name="confirmpassword"
           id="confpassword"
           placeholder="••••••••"
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
           required
           value={formData.confirmpassword ? formData.confirmpassword : ""}
           onChange={inputChangeHandler}
         />
         <span>{passwordError?passwordError:""}</span>
       </div>
       <br></br>
       
       
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
        
         className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
       >
         Login to your account
       </button>
       <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
         Already registered?{" "}
         <Link to={'/login'} href="#" className="text-blue-700 hover:underline dark:text-blue-500">
           Login
         </Link>
       </div>
     </form>
   </div>
   </div>
  );
};



export default Registration