import { useState } from 'react'

import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Blog from './pages/Blog'
import Product from './pages/Product'
import {ToastContainer} from 'react-toastify'
import Cart from './pages/Cart'
function App() {

  return (
   <main className='overflow-hidden text-tertiary'>
    <ToastContainer/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collection' element={<Collection/>}/>
      <Route path='/blog' element={<Blog/>}/>
      <Route path='*' element={<h1 className='text-center text-3xl'>404 Not Found</h1>}/>
      <Route path='/product/:productId' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
   </main>
  )
}

export default App
