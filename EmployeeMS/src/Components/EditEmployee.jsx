import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditEmployee = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: ""
    })

    const [category, setCategory] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/category')
            .then(response => {
                // console.log(response.data.data)
                setCategory(response.data.data)
            })
            .catch(err => { console.log(err) })

        axios.post('http://localhost:3000/emp_by_id', {
            "id": id
        })
            .then(response => {
                // 
                setEmployee({
                    ...employee,
                    name: response.data.data[0].name,
                    email: response.data.data[0].email,
                    address: response.data.data[0].address,
                    salary: response.data.data[0].salary,
                })
            })
    }, [])

    function handleEditEmployee() {
        axios.put('http://localhost:3000/upt_emp', {
            "name": employee.name,
            "email": employee.email,
            "address": employee.address,
            "salary": employee.salary,
            "id": id,
        })
            .then(response => {
                if (response.data.status == '200') {
                    alert(response.data.message)
                    navigate('/dashboard/employee')
                }else{
                    alert('Update Failed')
                }
            })
    }
    return (
        <div className='d-flex justify-content-center align-items-center mt-3 '>
            <div className='p-3 rounded w-50 border'>
                <h2 className='text-center'>EDIT EMPLOYEE</h2>
                <div className='row g-1'>
                    <div className="col-12">
                        <label htmlFor="inputName" className='form-label'>Name</label>
                        <input type="text" className='form-control rounded-0' name="" value={employee.name} id="inputName" placeholder='Enter Name' onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
                    </div>

                    <div className="col-12">
                        <label htmlFor="inputEmail" className='form-label'>Email</label>
                        <input type="email" className='form-control rounded-0' name="" value={employee.email} id="inputEmail" placeholder='Enter Email' onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                    </div>

                    <div className="col-12">
                        <label htmlFor="inputSal" className='form-label'>Salary</label>
                        <input type="text" className='form-control rounded-0' name="" value={employee.salary} id="inputSal" autoComplete='off' placeholder='Enter Salary' onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
                    </div>

                    <div className="col-12">
                        <label htmlFor="inputAdd" className='form-label'>Address</label>
                        <input type="text" className='form-control rounded-0' name="" value={employee.address} id="inputAdd" autoComplete='off' placeholder='Enter Address' onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
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
                        <button className='btn btn-primary w-100' onClick={handleEditEmployee}>EDIT EMPLOYEE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmployee