import {React, useState} from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'





export const Register = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // http://localhost:5000

  const reg = (e)=>{
    e.preventDefault() ;
    const data = {
      username: username ,
      password: password
    }
    
    axios.post('http://localhost:5000/register',data)
    .then((resp)=>{
      console.log("Success",resp.data) ;
    })
    .catch((err)=>{
      console.log("Error",err)
    })

  }
  

  return (
    <>

      <form action="" onSubmit={reg}   className='form'>

        <h1>Register</h1>

        <input  onChange={(e)=>{setUsername(e.target.value)}} placeholder='Username' type="text" />
        <input  onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' type="password" />

        <button  >Register</button>

        <Link to={'/login'} className="text">
          Login
        </Link>

        <Link to="/">Profile</Link>

      </form>


    </>
  )
}
