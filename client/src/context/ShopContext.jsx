import React, { createContext,useState,useEffect, use } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
  const [token,setToken] = useState("")
  const [search,setSearch] = useState("")
  const [products,setProducts] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL
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

  const getProductData = async()=>{
      try{
        const response = await axios.get(backendUrl+ "/api/product/list" )
        if(response.data.success){
          setProducts(response.data.products)
        }else{
          toast.error(response.data.message)
        }
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
  }
  useEffect(()=>{
    if(!token && localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
    getProductData()
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
    getCartAmount,
    token,
    setToken,
    backendUrl
  }
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider