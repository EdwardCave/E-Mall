import React from 'react'
import {FaFacebook,FaInstagram,FaTwitter} from 'react-icons/fa6'
const NewsLetter = () => {
  return (
    <section className='max-padd-container border-t-[1px] border-b-[1px] border-primary py-4'>
      <div className='flexBetween flex-wrap gap-8'>
        <div>
          <h4 className=' blod-14 uppercase tracking-wider'>Subscribe to our newsletter</h4>
          <p>Get latest information on Events, Sales & Offers.</p>
        </div>
        <div>
          <div className='flex bg-primary'>
            <input type="email" placeholder='Enter your email address' className='bg-transparent p-4 text-xs bg-primary w-[266px] outline-none text-x-[10px]'/>
            <button className='btn-dark !rounded-none !text-[13px] !font-bold'>Submit</button>
          </div>
        </div>
        <div className='flex gap-x-3 pr-14'>
          <div className='h-8 w-8 rounded-full flexCenter transition-all furation-500 hover:text-white hover:bg-tertiary
          cursor-pointer'><FaFacebook/></div>
          <div className='h-8 w-8 rounded-full flexCenter transition-all furation-500 hover:text-white hover:bg-tertiary
          cursor-pointer'><FaInstagram/></div>
          <div className='h-8 w-8 rounded-full flexCenter transition-all furation-500 hover:text-white hover:bg-tertiary
          cursor-pointer'><FaTwitter/></div>
        </div>
      </div>
    </section>
  ) 
}

export default NewsLetter