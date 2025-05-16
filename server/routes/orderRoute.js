import express from 'express'
import { allOrders, placeOrder, placeOrderStripe,userOrders} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()


// for admin
orderRouter.post('/list',adminAuth,allOrders )
orderRouter.post('/status',adminAuth,allOrders )

// for payment
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe )

// for user
orderRouter.post('/userorders',authUser,userOrders )

export default orderRouter