import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditCategory = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [catChange,setCatChange] = useState({
        id : id,
        category : ''
    })

    const [category, setCategory] = useState({
        category : ''
    })
    
    useEffect(()=>{
        categoryDB()
    },[])

    const categoryDB = () =>{
        axios.post('http://localhost:3000/category_by_id',{
            "id" : id
        })
        .then(responce =>{
            setCatChange({
                ...category,
                category : responce.data.data[0].name
            })
        })
    }

    const handleEditCategory = () =>{
        axios.put('http://localhost:3000/upt_cat',{
            "id" : id,
            "name" : catChange.category
        })
        .then(responce =>{
            alert(responce.data.message)
            navigate('/dashboard/category')
        })
    }
  return (
    <div className='d-flex justify-content-center align-items-center mt-3 '>
    <div className='p-3 rounded w-50 border'>
        <h2 className='text-center'>EDIT CATEGORY</h2>
        <div className='row g-1'>
            <div className="col-12">
                <label htmlFor="inputName" className='form-label'>Category</label>
                <input type="text" className='form-control rounded-0'  value={catChange.category} onChange={(e) => setCatChange({ ...catChange, category: e.target.value })} name="" id="inputName" />
            </div>

            <div className="col-12 mb-3">
                <button className='btn btn-primary w-100' onClick={handleEditCategory}>EDIT EMPLOYEE</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditCategory