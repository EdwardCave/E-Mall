import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
// controller function for placing order using cod method
const placeOrder = async(req,res) => {
    try{
        const {userId,items,amount,address} = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order Placed Successfully"})
    }catch(error){
        res.json({success:false, message:error.message})
    }
}


// controller function for placing order using stripe method

const placeOrderStripe = async(req,res) => {
    try{
        const {userId,items,amount,address,paymentMethod} = req.body
        const order = new orderModel({userId,items,amount,address,paymentMethod})
        await order.save()
        res.json({success:true, message:"Order Placed Successfully"})
    }catch(error){
        res.json({success:false, message:error.message})
    }
}

// controller function for getting all  orders data for admin panel 
const allOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
    
}

// controller function for updating user order status 

const userOrders = async(req,res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
    
}

const updateStatus = async(req,res) => {
    try {
        const {orderId,status} = req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true, message:"Order Status Updated Successfully"})
    } catch (error) {
         res.json({success:false, message:error.message})
    }
    
}

export {placeOrder,placeOrderStripe,userOrders,allOrders,updateStatus}