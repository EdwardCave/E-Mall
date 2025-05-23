import React from 'react'
import headphones from '../assets/headphones.png'
import {FaArrowRightLong} from 'react-icons/fa6'
const Hero = () => {
  return (
    <section className='max-padd-container'>
        <div className='grid grid-cols-2  bg-cover bg-hero bg-center bg-no-repeat h-[633px] rounded-2xl'>
            {/* left side */}
            <div className='place-content-end max-xs:min-w-80'>
                <div className='p-4'>
                    <p className='text-white max-w-xs'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, deleniti dolorem. </p>
                    <button className='btn-white mt-6'>Explore more</button>
                </div>
            </div>
            {/* right side */}
            <div className='hidden xs:block place-items-end'>
                <div className='flex flex-col rounded-2xl w-[211px] relative  top-10 right-4 p-2 bg-white'>
                    <img src={headphones} alt=""  className='rounded-2xl bg-slate-900/10'/>
                    <button className='btn-light !py-1 !text-xs flexCenter gap-2 mt-2'>Explore this product<FaArrowRightLong/></button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero

// rounded-2xl:设置圆角
// place-content-end:设置内容在网格容器中的对齐方式