import { useState,useEffect } from 'react'
import {ToastContainer} from 'react-toastify'
import {Routes,Route} from 'react-router-dom'
import Slidebar from './components/Slidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'

export const backend_url = import.meta.env.VITE_BACKEND_URL
export const currency = "$"
function App() {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")
  useEffect(() => {
    localStorage.setItem("token",token)
  },[token])

  return (
    <main>
      <ToastContainer/>
      {token === "" ? (
        <Login setToken={setToken}/> 
      ): (
      <div className='bg-primary text-[#404040]'>
        <div className='mx-auto max-w-[1440px] flex flex-col sm:flex-row'>
          <Slidebar setToken={setToken}/>
          <Routes>
            <Route path="/" element={<Add token={token}/>}></Route>
            <Route path="/list" element={<List token={token}/>}></Route>
            <Route path="/orders" element={<Orders token={token}/>}></Route>
          </Routes>
        </div>
      </div>
      )}
      </main>
  )
}

export default App
