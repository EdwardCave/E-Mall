import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = ({containerStyles,onClick}) => {
    const navLinks = [
        {path:'/', name:'Home'},
        {path:'/collection', name:'Collection'},
        {path:'/blog', name:'Blog'},
        {path:'/Contact', name:'Contact'},
      ]
  return (
    <nav className={ `${containerStyles}`}>
        {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path}
            className={({isActive}) => `${isActive ? 'active-link' :''} px-3 py-2 rounded-full`}
            onClick={onClick}
            >
                {link.name}
            </NavLink>
        ))
        }
    </nav>
  )
}

export default Navbar