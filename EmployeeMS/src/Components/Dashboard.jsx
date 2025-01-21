import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './dashboard.css'
import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
    const navigate = useNavigate()
    const email = localStorage.getItem('email')
    
    function Logout(){
        let a = confirm('Are You Sure To Logout')

        if(a == true){
            navigate('/')
            // alert('Test')
        }else{
            return false
        }
    }
  return (
    <div className='container-fluid'>
        <div className='row flex-nowrap'>
            <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
                <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                    <Link to="/dashboard" className='d-flex align-items-center pb-3 mb-md-1 mt-md-auto text-white text-decoration-none'>
                        <span className='fs-5 fw-bolder d-none d-sm-inline'>Code With Shubham</span>
                    </Link>
                    <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
                        <li className='w-100'>
                            <Link to="/dashboard" className='nav-link text-white px-0 align-middle '><span className='ms-2 d-none d-sm-inline dashbord'>Dashboard</span></Link>
                        </li>

                        <li className='nav-link px-0 align-middle text-white'>
                            <Link to="/dashboard/employee"><span className='ms-2 d-done d-sm-inline manageEmployee'>Manage Employee</span></Link>
                        </li>

                        <li className='nav-link px-0 align-middle text-white'>
                            <Link to="/dashboard/category"><span className='ms-2 d-done d-sm-inline manageEmployee'>Category</span></Link>
                        </li>

                        <li className='nav-link px-0 align-middle text-white'>
                            <Link to="/dashboard/profile"><span className='ms-2 d-done d-sm-inline manageEmployee' >Profile</span></Link>
                        </li>

                        <li className='nav-link px-0 align-middle text-white'>
                            <span className='ms-2 d-done d-sm-inline manageEmployee' onClick={Logout}>Logout</span>
                        </li>

                    </ul>
                </div>
            </div>
            <div className='col p-0 m-0'>
                <div className='p-2 d-flex justify-content-center shadow'>
                    <h4>Employee Management System</h4>
                </div>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard