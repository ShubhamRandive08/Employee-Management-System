import { useEffect, useState } from 'react'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Category = () => {
  const [category,setCategory] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/category')
      .then(response => {
        // console.log(response.data.data)
        setCategory(response.data.data)
      })
      .catch(err => { console.log(err) })
  }, [])

  function handleDeleteCat(id){
    const rs = confirm('Are You Sure To Delete?')

    if(rs){
      axios.delete('http://localhost:3000/del_cat',{
        data : {"id" : id}
      }
      )
      .then(response =>{
        alert(response.data.message)
        window.location.reload()
      })
    }
  }

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
      <div className='mt-3'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                    {
                                      category.map(c =>(
                                        <tr>
                                          <td>{c.name}</td>
                                          <td>
                                            <Link to={`/dashboard/edit_category/`+c.id} className='btn btn-info btn-sm me-2 p-2'>Edit</Link>
                                            <button className='btn btn-danger btn-sm p-2'onClick={()=> handleDeleteCat(c.id)}>Delete</button>
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

export default Category