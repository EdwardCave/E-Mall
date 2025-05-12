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
// add item to cart
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
// get total items in cart
  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        totalCount += cartItems[items][item]
      }
    }
    return totalCount
  }

  // update the quantity of cart item
  const updateQuantity = (itemId,color,quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId][color] = quantity
    setCartItems(cartData) 
  }

  // Get total cart amount
  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      let itemInfo = products.find((product)=> product._id === items)
      for(const item in cartItems[items]){
        
        try{
          if(cartItems[items][item]>0){
            totalAmount += itemInfo.price * cartItems[items][item]

          }
        }catch(e){
          console.log(e)
        }
      }
    }
    return totalAmount
  }

  useEffect(()=>{
   console.log(cartItems)
  },[cartItems])
  
  
  const value = {
    navigate,
    products,
    search,
    setSearch,
    currency,
    delivery_charges,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount
  }
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider