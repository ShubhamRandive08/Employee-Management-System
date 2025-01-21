import React from 'react'
import './Profile'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Profile = () => {
  const  [userdata, setUserDat] = useState([])
  const email = localStorage.getItem('email')

  useEffect(()=>{
    // alert(email)
    axios.post('http://localhost:3000/adminData',{
      'email' : email
    })
      .then(responce  =>{
        setUserDat(responce.data.data)
      })
  },[])
  return (
    <div className='d-flex justify-content-center align-items-center mt-3 '>
      <div className='p-3 rounded w-50 border'>
        <h2 className='text-left'>Welcome Admin</h2>
        <div className='row g-1'>

          <table className='table'>
      <thead>
        <tr>
          <th>Admin ID</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {
          userdata.map(e => (
            <tr>
              <td>{e.id}</td>
              <td>{e.email}</td>
              <td>{e.password}</td>
            </tr>
          ))
        }
     </tbody>
    </table>
        </div>
      </div>
    </div>
   
  )
}

export default Profile