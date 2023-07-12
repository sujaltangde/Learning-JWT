import {React } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const Profile = () => {



  const del = ()=>{
    axios.delete('http://localhost:5000/delete')
    .then((res)=>{
      console.log('Deleted')
    })
    .catch((err)=>{
      console.log('Error')
    })
  }

  const logout = () => {
    axios.post('http://localhost:5000/logout')
    .then((resp)=>{
      console.log("Logout successfull",resp.data) ;
    })
    .catch((err)=>{
      console.log("Error",err)
    })
  }


  return (
      <>

        <div className='form'>
            <h1>Status : </h1>
            <Link to='/login' >Login</Link>
            <p></p>
            <Link to='/register' >Register</Link>
            <button onClick={()=>{del()}} >Delete all data</button>
            <button onClick={()=>{logout()}} >Logout</button>
           
        </div>
      
      </>
  )
}
