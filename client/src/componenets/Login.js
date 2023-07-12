import {React, useState} from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {

 const [user,setUser] = useState("") ;
 const [pass,setPass] = useState("") ;
 const [status, setSta] = useState(false) ;
  
  const log = (e) => {
    e.preventDefault() ;
    const data = {
      username: user,
      password: pass
    }

    axios.post('http://localhost:5000/login',data)
    .then((resp)=>{
      setSta(true) ;
      console.log("Login Successfull",resp.data) ;
    })
    .catch((err)=>{
      setSta(false) ;
      console.log("Error",err) ;
    })
  }




  return (
       <>

       <form action="" onSubmit={log} className='form'>
        <h1>Login</h1>
        <input onChange={(e)=>{setUser(e.target.value)}} placeholder='Username' type="text" />
        <input onChange={(e)=>{setPass(e.target.value)}} placeholder='Password' type="password" />
        <button>Login</button>
        <Link to={'/register'} className="text">
                Register
        </Link>
        <Link to="/">Profile</Link>
       </form>     
       <p>{status ? "logged In" : "not logged in"}</p>
       
       </>
  )
}
