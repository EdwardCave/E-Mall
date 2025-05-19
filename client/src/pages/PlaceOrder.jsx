import React,{useState} from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const PlaceOrder = () => {
    const [method, setMethod] =useState('cod')

    const {
        navigate,
        products,
        currency,
        delivery_charges,
        cartItems,
        setCartItems,
        addToCart,
        getCartAmount,
        token,
        backendUrl
    }= useContext(ShopContext)

    const [formData,setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setFormData((data)=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        console.log(formData)
        try {
            let orderItems = []
            for(const items in cartItems){
                for(const item in cartItems[items]){
                    if(cartItems[items][item] > 0){
                        const itemInfo = structuredClone(products.find((product)=> product._id === items))
                        if(itemInfo){
                            itemInfo.color = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                    
                }
            }
            console.log(orderItems)

            let orderData = {
                items: orderItems,
                amount: getCartAmount() + delivery_charges,
                address: formData,
                
            }
            switch (method) {
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if(response.data.success){
                        toast.success(response.data.message)
                        setCartItems({})
                        navigate('/orders')
                    }else {
                        toast.error(response.data.message)
                    }
                    break;
                    // case 'stripe':
                    // const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    // if(responseStripe.data.success){
                    //     const {session_url} = responseStripe.data
                    //     window.location.replace(session_url)
                    
                    // }else {
                    //     toast.error(responseStripe.data.message)
                    // }
                    // break;
                
                default:
                    break;
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }
  return (
    <div>
        <div className='bg-primary mb-16'>
            {/* CONTAINER */}
            <form onSubmit={onSubmitHandler} className='max-padd-container py-10'>
                <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
                    {/* LEFT SIDE */}
                    <div className='flex flex-1 flex-col gap-3 text-[95%]'>
                        <Title title1={`Delivery`} title2={`Infomation`}  />
                        <div className='flex gap-3'>
                            <input type="text" placeholder='First Name'
                                name='firstName'
                                onChange={onChangeHandler} value={formData.firstName}
                                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'
                                required/>
                            <input type="text" placeholder='Second Name'
                                name='lastName'
                                onChange={onChangeHandler} value={formData.lastName}
                                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'
                                required/>
                        </div>
                        <input type="text" placeholder='Email Address'
                            onChange={onChangeHandler} value={formData.email} name='email'
                            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none '
                            required/>
                        <input type="number" placeholder='Phone Number'
                            onChange={onChangeHandler} value={formData.phone} name='phone'
                            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'
                            required/>
                        <input type="text" placeholder='Street'
                            onChange={onChangeHandler} value={formData.street} name='street'
                            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'
                            required/>
                        
                        <div className='flex gap-3'>
                            <input type="text" placeholder='City'
                                onChange={onChangeHandler} value={formData.city} name='city'
                                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'
                                required/>
                        <input type="text" placeholder='State'
                            onChange={onChangeHandler} value={formData.state} name='state'
                            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'
                            required/>
                        </div>
                    
                        <div className='flex gap-3'>
                            <input type="number" placeholder='Zip Code'
                            onChange={onChangeHandler} value={formData.zipCode} name='zipCode'
                                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
                            <input type="text" placeholder='Country'
                            onChange={onChangeHandler} value={formData.country} name='country'
                                className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
                        </div>
                   
                    </div>
                     {/* RIGHT SIDE   */}
                     <div className='flex flex-1 flex-col'>
                        <CartTotal/>
                        {/* PAYMENT METHOD */}
                        <div className='my-6'>
                            <h3 className='bold-20 mb-5'>Payment <span>Method</span></h3>
                            <div className='flex gap-3'>
                                <div onClick={()=>setMethod('stripe')} className={`${method === 'stripe' ? 'btn-dark' : 'btn-white' } !py-1 text-xs cursor-pointer`}>Stripe</div>
                                <div onClick={()=>setMethod('cod')} className={`${method === 'cod' ? 'btn-dark' : 'btn-white' } !py-1 text-xs cursor-pointer`}>Cash on Delivery</div>

                            </div>
                        </div>
                        <div>
                            <button type='submit' className='btn-secondary'> Place Order</button>
                        </div>
                     </div>
                </div>  
            </form>
            <Footer/> 
        </div>
    </div>
  )
}

export default PlaceOrder