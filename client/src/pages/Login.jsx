import React,{useContext, useState,useEffect} from 'react'
import login from '../assets/login.png'
import { ShopContext } from '../context/ShopContext'
import {toast} from 'react-toastify'
import axios from 'axios'

const Login = () => {
    const [currState, setCurrState] = useState('Sign Up')
    const {token,setToken,navigate,backendUrl} = useContext(ShopContext)
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const onSubmitHandler = async(e) => {
        e.preventDefault()
        try{
            if(currState === 'Sign Up'){
                // SIGN UP
                const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
                console.log(response,'register')
                if(response.data.success){
                    setToken(response.data.token)
                    localStorage.setItem("token",response.data.token)
                }else {
                    toast.error(response.data.message)
                }
            }else {
                // Login in
                const response = await axios.post(backendUrl + '/api/user/login',{email,password})
                console.log(response,'login')
                if(response.data.success){
                    setToken(response.data.token)
                    localStorage.setItem("token",response.data.token)
                }else {
                    toast.error(response.data.message)
                }
            }
        }catch(error){
            toast.error(error.message)

        }
    }

    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token])
  return (
    <div className='absolute top-0 left-0 h-full w-full z-50 bg-white'>
        {/* CONTAINER */}
        <div className='flex h-full w-full'>
            {/* IMAGE SIDE */}
            <div className='w-1/2 hidden sm:block'>
                <img src={login} alt="" className='object-cover w-full h-full'/>
            </div>
            {/* FORM SIDE */}
            <div className='flexCenter w-full sm:w-1/2 text-[90%]'>
                <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90% sm:max-w-md m-auto gap-y-5'>
                    <div className='w-full mb-4'>
                        <h3 className='bold-36'>{currState}</h3>

                    </div>
                   {currState === 'Sign Up' && (
                    <div className='w-full'>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}
                        className='w-full px-3  py-1.5 ring-1 ring-slate-900/5 rounded bg-primary mt-1' />
                    </div>
                   )}
                   <div className='w-full'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Email---admin@gmail.com' onChange={(e) => setEmail(e.target.value)} value={email}
                        className='w-full px-3 py-1.5 ring-1 ring-slate-900/5 rounded bg-primary mt-1' />
                   </div>
                   <div className='w-full'>
                        <label htmlFor="password" className='medium-15'>Password</label>
                        <input type="passwor" placeholder='Password--admin1234' onChange={(e) => setPassword(e.target.value)} value={password}
                        className='w-full px-3 py-1.5 ring-1 ring-slate-900/5 rounded bg-primary mt-1' />
                   </div>
                   <button type="submit" className='btn-dark w-full mt-5 !py-[8px] !rounded'>{currState === 'Sign Up' ? 'Sign Up' : 'Sign In'}</button>
                   <div className='w-full flex flex-col gap-y-3'>
                    {currState === 'Login' ? (
                       <>
                        <div className='underline medium-15'>Forgot your password</div>
                        
                            <div className='underline medium-15'>
                                Don't have an account? <span onClick={() => setCurrState('Sign Up')} className='cursor-pointer pl-1'>Sign Up</span>
                            </div>
                            </>
                        ) : (
                            <div className='underline medium-15'>
                                Already have an account? <span onClick={() => setCurrState('Login')} className='cursor-pointer pl-1'>Login</span>
                            </div>
                        
                        )}
                   </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login