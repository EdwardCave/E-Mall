import React from 'react'
import cards from '../assets/cards.png'
const Footer = () => {
  return (
    <footer>
        <div className='max-padd-container flex items-start justify-between flex-wrap gap-12 mt-12'>
            {/* LOGO */}
            <div className='flex flex-col max-w-sm gap-y-5'>
                <div className='bold-28'>E-Mall</div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas earum reprehenderit possimus!</p>
                <img src={cards} alt="" height={33} width={144}  className='mt-5'/>
            </div>
            <div className='flexStart gap-7 xl:gap-x-36 flex-wrap'>
                <ul>
                    <h4 className='h4 mb-3'>Customer1 Service</h4>
                    <li className='my-2'>
                        <a href="" className='text-gray-30 regular-14'>Contact</a> 
                    </li>
                </ul>
                <ul>
                    <h4 className='h4 mb-3'>Legal</h4>
                    <li className='my-2'>
                        <a href="" className='text-gray-30 regular-14'>Privacy Policy</a> 
                    </li>
                </ul>
                <ul>
                    <h4 className='h4 mb-3'>Others</h4>
                    <li className='my-2'>
                        <a href="" className='text-gray-30 regular-14'>teams</a> 
                    </li>
                </ul>
            </div>
        </div>
        {/* COPYRIGHT */}
        <p className='max-padd-container mt-12 flex flexCenter mb-5'>Copyright &copy; 2025 E-Mall All rights reserved</p>
    </footer>
  )
}

export default Footer