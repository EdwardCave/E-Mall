import React,{useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams  } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
const Verify = () => {
    const {navigate,token,setCartItems,backendUrl} =useContext(ShopContext)
    const [searchParams,setSearchParams] = useSearchParams()

    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
   

    const verifyPayment = async() => {
        try {
            if(!token){
                return null
            }
            const response = await axios.post(backendUrl + '/api/order/verifyStripe',{orderId,success},{headers:{token}})
            if(response.data.success){
                setCartItems({})
                navigate("/orders")
            }else {
                navigate("/cart")
            }
        } catch (error) {
            toast.error(error.message)
        }
        
    }
    useEffect(()=>{
        verifyPayment()
    },[])
  return (
    <div>
        <div>订单支付成功</div>
    </div>
  )
}

export default Verify