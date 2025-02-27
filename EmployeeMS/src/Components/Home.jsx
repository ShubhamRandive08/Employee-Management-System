import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  const [adminTotal, setAdminCount] = useState(0)
  const [employeeTotal, setEmployeeCout] = useState(0)
  const [salaryTotal, setSalayryCount] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount()
    employeeCount()
    salaryCount()
    AdminRecords()
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:3000/admin_data')
      .then(responce => {
        setAdmins(responce.data.data)
      })
  }

  function adminCount() {
    axios.get('http://localhost:3000/admincout')
      .then(responce => {
        setAdminCount(responce.data.data.length)
      })
  }

  function employeeCount() {
    axios.get('http://localhost:3000/employeecout')
      .then(responce => {
        setEmployeeCout(responce.data.data.length)
      })
  }

  function salaryCount() {
    axios.get('http://localhost:3000/salaruCount')
      .then(responce => {
        setSalayryCount(responce.data.data[0].sum)
      })
  }

  function handleDeleteAdmin(id) {
    alert(id)
  }
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total : {adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total : {employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total : {salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-4 pt-3'>
        <h3>List Of Admin</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => {
                <tr>
                  <td>{a.email}</td>
                  <td>
                    <button className='btn btn-info btn-sm me-2'>Edit</button>
                    <button className='btn btn-warning btn-sm' >Delete</button>
                  </td>
                </tr>

              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home