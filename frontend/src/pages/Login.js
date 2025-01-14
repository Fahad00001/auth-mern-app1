import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Login() {

    const [LoginInfo,setLoginInfo]=useState({
        // name:'',
        email:'',
        password:''
    })

    const navigate=useNavigate()

    const handleChange=(e)=>{
        const {name,value}=e.target
        console.log (name,value)
        const copyLoginInfo={...LoginInfo}
        copyLoginInfo[name]=value
        setLoginInfo(copyLoginInfo)


    }

    // console.log('logininfo->', loginInfo)

    const handleLogin=async(e)=>{
        e.preventDefault()
        const {email,password}=LoginInfo
        if(!email||!password){
            return handleError('All fields are required')
        }

        try {
            const url='http://localhost:8080/auth/login'
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(LoginInfo)
            });
            const result=await response.json();
           
            const {success,message,jwtToken, user ,error}=result;
            // console.log(result)
            if(success){
                handleSuccess(message)
                localStorage.setItem('token',jwtToken)
                localStorage.setItem('loggedInUser', user || 'Unknown User');


                setTimeout(() => {
                    navigate('/home')
                    
                }, 1000);
            }
           
            else if(error){
                
                const details=error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message)
            }
            console.log(result)

            
        } catch (error) {
            handleError(error)
            
        }


    }
  return (
    <div className='container'>
        <h1>Login</h1>
    <form onSubmit={handleLogin}>
    
        <div>
            <label htmlFor='email'>Email</label>
           
            <input type='text' onChange={handleChange} name='email' value={LoginInfo.email} autoFocus placeholder='Enter your email'/>
        </div> 
        <div>
            <label htmlFor='email'>Password</label>
           
            <input type='password' onChange={handleChange} name='password' value={LoginInfo.password}  placeholder='enter your password'/>
        </div> 
        <button>Signup</button>
        <span>Don`t` have an account ?
            <Link to={'/signup'}>Signup</Link>
            
        </span>
    </form>
    <ToastContainer/>
    </div>
  )
}

export default Login