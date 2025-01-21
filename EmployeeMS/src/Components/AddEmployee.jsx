import React from 'react'
import { useEffect, useState } from 'react'
import axios, { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
  const [category, setCategory] = useState([])

  const navigate = useNavigate()

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: ""
  })
  function handleEmpoyee() {
    if (employee.name == '' || employee.email == '' || employee.password == '' || employee.salary == '' || employee.address == '' || employee.category_id == '')
      alert('Please Enter all details.')
    else {
      axios.post('http://localhost:3000/addEmployee', {
        "name": employee.name,
        "email": employee.email,
        "password": employee.password,
        "salary": employee.salary,
        "address": employee.address,
        "category_id": employee.category_id
      })
        .then(responce => {
          if (responce.data.status == '200') {
            alert(responce.data.message)
            navigate('/dashboard/employee')
          }
          else
            alert(responce.data.message)
        })
    }
  }

  function handleCancle(){
    const rs = confirm('Are Your Sure To Cancle The Change')

    if(rs)
      navigate('/dashboard/employee')
    else
      return false
  }
  useEffect(() => {
    axios.get('http://localhost:3000/category')
      .then(response => {
        // console.log(response.data.data)
        setCategory(response.data.data)
      })
      .catch(err => { console.log(err) })
  }, [])
  return (
    <div className='d-flex justify-content-center align-items-center mt-3 '>
      <div className='p-3 rounded w-50 border'>
        <h2 className='text-center'>ADD EMPLOYEE</h2>
        <div className='row g-1'>
          <div className="col-12">
            <label htmlFor="inputName" className='form-label'>Name</label>
            <input type="text" className='form-control rounded-0' name="" id="inputName" placeholder='Enter Name' onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
          </div>

          <div className="col-12">
            <label htmlFor="inputEmail" className='form-label'>Email</label>
            <input type="email" className='form-control rounded-0' name="" id="inputEmail" placeholder='Enter Email' onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
          </div>

          <div className="col-12">
            <label htmlFor="inputPass" className='form-label'>Password</label>
            <input type="password" className='form-control rounded-0' name="" id="inputPass" placeholder='Enter Password' onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />
          </div>

          <div className="col-12">
            <label htmlFor="inputSal" className='form-label'>Salary</label>
            <input type="text" className='form-control rounded-0' name="" id="inputSal" autoComplete='off' placeholder='Enter Salary' onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
          </div>

          <div className="col-12">
            <label htmlFor="inputAdd" className='form-label'>Address</label>
            <input type="text" className='form-control rounded-0' name="" id="inputAdd" autoComplete='off' placeholder='Enter Address' onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
          </div>

          <div className="col-12">
            <label htmlFor="category" className='form-label'>Category</label>
            <select name="category" id="category" className='form-select' onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
              {
                category.map(c => {
                  return <option value={c.id}>{c.name}</option> // c.id because we should store the data into database depend upon id
                })
              }
            </select>
          </div>

          <div className="col-12 mb-3">
            <button className='btn btn-primary w-100' onClick={handleEmpoyee}>ADD EMPLOYEE</button>
            <button className='btn btn-warning w-100 mt-2' onClick={handleCancle}>CANCLE</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee