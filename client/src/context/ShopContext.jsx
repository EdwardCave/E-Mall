import React, { createContext,useState,useEffect } from 'react'
import { products } from '../assets/data.js'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
export const ShopContext = createContext()

const ShopContextProvider = (props) => {
  const [search,setSearch] = useState("")
  const navigate = useNavigate()
  const currency = "$"
  const delivery_charges = 10
  const [cartItems, setCartItems] = useState([])


  const addToCart = async(itemId,color) => {
  if(!color){
    toast.error("Please select a color")
  }

    const cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      if(cartData[itemId][color]){
        cartData[itemId][color] += 1
      }else{
        cartData[itemId][color] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][color] = 1
    }
    setCartItems(cartData) 
  }

  useEffect(()=>{
console.log(cartItems)
  },[cartItems])
  
  
  const value = {products,search,setSearch,currency,delivery_charges,cartItems,setCartItems,addToCart}
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider