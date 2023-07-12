import React,{useState} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Login } from './componenets/Login';
import { Register } from './componenets/Register';
import { Profile } from './componenets/Profile';

function App(){
  return (
    <>

      <Router>
        <Routes>
            <Route path='/' element={<Profile/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
  


    
   
    
    </>
    );
  }

export default App;




















