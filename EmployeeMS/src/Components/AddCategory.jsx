import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category , setCategory] = useState('')
    const navigate = useNavigate();

    const handleCategory = (e) =>{
        setCategory(e.target.value)
    }

    function addCategory(){
        // alert('Test')
        if(category == '')
            alert('Please Enter Category')
        else{
            axios.post('http://localhost:3000/add_category',{
                "category" : category
            })
            .then(response =>{
                // alert(response.data.message)
                if(response.data.status == '200'){
                    alert(response.data.message)
                    navigate('/dashboard/category')
                }
                else
                    alert(response.data.message)
            })
        }
    }

    function handleCancle(){
        const rs = confirm('Are You Sure To Cancle ?')

        if(rs){
            navigate('/dashboard/category')
        }else
            return false
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75 '>
        <div className='p-3 rounded w-25 border'>
            <h2>ADD CATEGORY</h2>
                {/* <form action=""> */}
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Category : </strong></label>
                        <input type="text" name="category" id="" autoComplete='off' placeholder='Enter the Category' className='form-control rounded-0' onChange={handleCategory} required/>
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'onClick={addCategory}>Add Category</button>
                    <button className='btn btn-warning w-100 rounded-0 mb-2'onClick={handleCancle}>Cancle</button>

                    
                {/* </form> */}
        </div>
    </div>
  )
}

export default AddCategory