import React, { createContext } from 'react'
import { products } from '../assets/data.js'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const value = {products}
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider