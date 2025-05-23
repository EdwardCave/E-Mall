import userModel from "../models/userModel.js"
//controller function for adding product to user cart

const addToCart = async(req,res)=>{
    try{
        const {userId,itemId,color} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        if(cartData[itemId]){
            if(cartData[itemId][color]){
                cartData[itemId][color] += 1
            }else{
                cartData[itemId][color] = 1
            }
        }else {
            cartData[itemId] = {}
            cartData[itemId][color] = 1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true, message:"Product added to cart"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})

    }
}


//controller function for updating to user cart
const updateCart = async(req,res)=>{
    try{
        const {userId,itemId,color,quantity} = req.body
        const userData = await userModel.findById(userId)

        let cartData = await userData.cartData
        cartData[itemId][color] = quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true, message:" Cart Updated"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

//controller function for getting  user cart data
const getUserCart = async(req,res)=>{
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        res.json({success:true, cartData})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    
}

export {addToCart,updateCart,getUserCart}