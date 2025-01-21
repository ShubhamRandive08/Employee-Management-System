import React,{useCallback,useState} from 'react'
import axios from 'axios'
import './style.css'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }

    const handlePass =  (e) =>{
        setPass(e.target.value)
    }

    const data = {
        email : email,
        pass : pass
    }

    function log(){
        if(email == '' || pass == ''){
            alert('Please Fill All Details')
        }else{
            axios.post('http://localhost:3000/login',
                data
            )
            .then(responce =>{
                if(responce.data.status == '200'){
                    alert(responce.data.message)
                    localStorage.setItem('email',email)
                    navigate('/dashboard')
                }
                else{
                    // alert(responce.data.message)
                    setError(responce.data.message)
                }

            })
        }
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-warning'>
                {error}
            </div>
            <h2>Login Page</h2>
                {/* <form action=""> */}
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email : </strong></label>
                        <input type="email" name="email" id="" autoComplete='off' placeholder='Enter the Email' className='form-control rounded-0' onChange={handleEmail}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password : </strong></label>
                        <input type="password" name="password" id="" autoComplete='off' placeholder='Enter the Password' className='form-control rounded-0' onChange={handlePass}/>
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2' onClick={log}>Log In</button>


                    <div className='mb-1'>
                        <input type="checkbox" name="tick" id="tick" className='me-2' />
                        <label htmlFor="password">You are agree with <a href="#">Term and Conditions</a></label>
                    </div>
                {/* </form> */}
        </div>
    </div>
  )
}
