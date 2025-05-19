import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

import Stripe from "stripe"


// const stripe = new Stripe(stripe_key)

const currency = "pkr"
const deliveryCharges = 10
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
//     try{
//         const {userId,items,amount,address} = req.body

//         const {origin} = req.headers

//         const orderData = {
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod:"Stripe",
//             payment:false,
//             date:Date.now()
//         }

//         const order = new orderModel(orderData)

//         await order.save()

//         const line_items = items.map(item => ({
          
//                 price_data: {
//                     currency: currency,
//                     product_data: {
//                         name: item.name,
                        
//                     },
//                     unit_amount: item.price * 100 * 277,
//                 },
//                 quantity: item.quantity,
          
//         }))
//         line_items.push({
//             price_data: {
//                 currency: currency,
//                 product_data: {
//                     name: "Delivery Charges",
                    
//                 },
//                 unit_amount: deliveryCharges * 100 * 277,
//             },
//             quantity: 1,
//         })

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items,
//             mode: 'payment',
//             success_url: `${origin}/verify?success=true&orderId=${order._id}`,
//             cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
//            
//         })
//         res.json({success:true, session_url: session.url})
//     }catch(error){
//         res.json({success:false, message:error.message})
//     }
 }


// controller function for verifying stripe(this is a temporary method for test)

 const verifyStripe = async(req,res) => {
//     const {orderId,success,userId} = req.body
//     try{
//         if(success === 'true'){
//             await orderModel.findByIdAndUpdate(orderId,{payment:true})
//             await userModel.findByIdAndUpdate(userId,{cartData:{}})
//             res.json({success:true})
//         }else{
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({success:false})
//         }
//     }catch(error){
//         res.json({success:false, message:error.message})
//     }
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

export {placeOrder,placeOrderStripe,userOrders,allOrders,updateStatus,verifyStripe}
