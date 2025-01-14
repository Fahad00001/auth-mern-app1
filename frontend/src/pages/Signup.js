import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Signup() {

    const [signupInfo,setsignupInfo]=useState({
        name:'',
        email:'',
        password:''
    })

    const navigate=useNavigate()

    const handleChange=(e)=>{
        const {name,value}=e.target
        console.log (name,value)
        const copyLoginInfo={...signupInfo}
        copyLoginInfo[name]=value
        setsignupInfo(copyLoginInfo)


    }

    // console.log('logininfo->', loginInfo)

    const handlesignup=async(e)=>{
        e.preventDefault()
        const {name,email,password}=signupInfo
        if(!name||!email||!password){
            return handleError('All fields are required')
        }

        try {
            const url='https://deploy-mern-app2-api1.vercel.app/auth/signup'
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(signupInfo)
            });
            const result=await response.json();
            const {success,message,error}=result
            // console.log(result)
            if(success){
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/login')
                    
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
        <h1>Signup</h1>
    <form onSubmit={handlesignup}>
        <div>
            <label htmlFor='name'>Name</label>
           
            <input onChange={handleChange} type='text' name='name' value={signupInfo.name} autoFocus placeholder='Enter your name'/>
        </div> 
        <div>
            <label htmlFor='email'>Email</label>
           
            <input type='text' onChange={handleChange} name='email' value={signupInfo.email} autoFocus placeholder='Enter your email'/>
        </div> 
        <div>
            <label htmlFor='email'>Password</label>
           
            <input type='password' onChange={handleChange} name='password' value={signupInfo.password}  placeholder='enter your password'/>
        </div> 
        <button>Signup</button>
        <span>Already have an account ?
            <Link to={'/login'}>    Login</Link>
            
        </span>
    </form>
    <ToastContainer/>
    </div>
  )
}

export default Signup
