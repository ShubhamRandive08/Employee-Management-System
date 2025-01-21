import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Employee = () => {
  const [employee, setEmployee] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/employee')
      .then(response => {
        // console.log(response.data.data)
        setEmployee(response.data.data)
      })
      .catch(err => { console.log(err) })
  }, [])

  function handleDeleteEmployee(id){
    const rs = confirm('Are You Sure To Delete?')

    if(rs){
      axios.delete('http://localhost:3000/del_emp_by_id',{
        data : {"id" : id}
      })
      .then(response =>{
        alert(response.data.message)
        window.location.reload()
      })
    }else
      return false
  }
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(e => (
                <tr>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/` + e.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                    <button className='btn btn-warning btn-sm' onClick={()=> handleDeleteEmployee(e.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee