import React,{use, useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import {FaBars,FaBarsStaggered} from 'react-icons/fa6'
import {TbUserCircle} from 'react-icons/tb'
import {RiUserLine} from 'react-icons/ri'
import { ShopContext } from '../context/ShopContext'
const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false)
    const {getCartCount,navigate,token,setToken} = useContext(ShopContext)
    const toggleMenu = () => setMenuOpened((prev)=> !prev)
    
    const logout =() =>{
      localStorage.removeItem("token")
      setToken("")
      navigate("/login")

    }
  return (
  <header className='max-padd-container w-full mb-2'>
    <div className=' flexBetween py-3  '>
        {/* logo */}
        <Link to={"/"} className=' flex flex-1 bold-24 xl:bold-28'>E-Mall</Link>
        {/* nav */}
        <div className='flex-1'>
          <Navbar 
          onClick={()=>setMenuOpened(false)}
          containerStyles={`${
            menuOpened 
            ?  "flex item-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white rounded-xl shadow-md w-52 ring-1 ring-slate-900/5 z-50" 
            :'hidden xl:flex gap-x-5  xl:gap-x-7 medium-15 bg-primary ring-1 ring-slate-900/5 rounded-full p-1'}`}/>
        </div>
        {/* button */}
        <div className='flex flex-1 items-center justify-end gap-x-2 xs:gap-x-8'>
            <>
            {menuOpened ? (
            <FaBarsStaggered className='xl:hidden cursor-pointer text-xl' onClick={toggleMenu}/>
            ) : (
            <FaBars className='xl:hidden cursor-pointer text-xl' onClick={toggleMenu}/>
            )}
            </>
            {/* cart */}
            <Link to={'/cart'} className='flex relative'>
            <div className='ring-1 ring-slate-900/5 rounded-full px-3 bold-18'>Cart
              <span className='bg-secondary text-white  text-[12px] font-semibold absolute -top-3.5 -right-2 flexCenter  w-4 h-4 rounded-full shadow-md'>
                {getCartCount()}
                </span>
            </div>
            </Link>
            {/* user profile  */}
            <div className='group relative'>
              <div>
                {token ? ( 
                  <div>
                    <TbUserCircle className='text-[29px] cursor-pointer'/>
                  </div>
                  
                ):(
                  <button onClick={()=>navigate('/login')} className='btn-dark flexCenter gap-x-2'>Login<RiUserLine className='text-xl'/></button>
                )}
              </div>
              {/* drop down */}
              {token && (
                <ul className='bg-white p-2 w-32 ring-1 ring-slate-900/5 rounded absolute right-0 top-7 hidden group-hover:flex flex-col regular-14 shadow-md z-50'>
                  <li onClick={()=>navigate('/orders')} className='text-tertiary rounded-md hover:bg-primary cursor-pointer'>Orders</li>
                  <li onClick={logout} className='text-tertiary rounded-md hover:bg-primary cursor-pointer'>Logout</li>
                </ul>
              )}
            </div>
        </div> 
    </div>
  </header>
  ) 
}

export default Header