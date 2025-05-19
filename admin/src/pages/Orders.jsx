import React ,{ useEffect,useState}from 'react'
import axios from 'axios'
import { backendUrl,currency } from '../App'
import { toast } from 'react-toastify'
import {TfiPackage} from 'react-icons/tfi'
const Orders = ({token}) => {
  const [orders,setOrders] = useState([])

  const fetchAllOrders = async()=>{
    if(!token){
      return null
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list',{},{headers:{token}})
      if(response.data.success){
        setOrders(response.data.orders)
      }else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const statusHandler = async(orderId,event)=>{
    try {
      const response = await axios.post(backendUrl + '/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
       await fetchAllOrders()
      }else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(response.data.message)
    }
  }

  useEffect(()=>{fetchAllOrders()},[token])
  return (
    <div className='px-2 sm:px-8 sm:mt-14'>
      <div className='flex flex-col gap-4'>
        {orders.map((order)=>(
          <div key={order._id} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] gap-4 items-start p-3 text-gray-700 bg-white rounded-lg'>
            <div className='flex item-center justify-center'>
              <TfiPackage className='text-3xl text-secondary'/>
            </div>
          <div>
            <div className='flex items-start gap-1'>
              <div className='medium-14'>Items:</div>
              <div className='flex flex-col relative top-0.5'>
                {order.items.map((item,index)=>{
                  if(index === order.items.length - 1){
                    return <p key={index}>{item.name} x {item.quantity} <span>"{item.color}"</span>,</p>
                  }else {
                    return <p key={index}>{item.name} x {item.quantity} <span>"{item.color}"</span>,</p>
                  }
                })}
              </div>
            </div>
            <p className='medium-14'> <span className='text-tertiary'>Name:</span>{order.address.firstName + " " + order.address.lastName}</p>
            <p className='medium-14'><span className='text-tertiary'>Address:</span>
              <span>{order.address.street + ','}</span>
              <span>{order.address.city + ',' +order.address.state + ',' + order.address.country + ',' + order.address.zipCode}</span>
            </p>
            <p>{order.address.phone}</p>
          </div>
          <div>
            <p className='text-sm'>Total: {order.items.length}</p>
            <p className='mt-3'>Method: {order.paymentMethod}</p>
            <p >Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p >Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <p className='text-sm font-semibold'>{currency}{order.amount}</p>
          <select onChange={(event)=>statusHandler(order._id,event)} value={order.status} className='text-xs font-semibold p-1 ring-1 ting-slate-900/5 rounded max-w-36 bg-primary'>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders