import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Cart = () => {

    const {products, currency, cartItems} = useContext(ShopContext)

    const [cartData, setCartData] = useState([])

    useEffect(() => {
        let tempCartData = []
        for (const item in cartItems){
            for (const size in cartItems[item]){
                const productItem = products.find((product) => product._id === item)
                tempCartData.push({
                    ...productItem,
                    size: size,
                    quantity: cartItems[item][size]
                })
            }
        }
        setCartData(tempCartData) 
    }, [cartItems])

    return (
        <div className='border-t pt-14'>
            <div className="text-2xl mb-3">
                <Title text1={"YOUR"} text2={"CART"} />
            </div>

            <div className="">
                {
                    cartData.map((item, index) => {

                        const productData = products.find((product) => product._id === item._id)

                        return (
                            <div key={index} className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                                <div className="flex items-start gap-6">
                                    <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                                    <div className="">
                                        <p className='font-medium text-xs sm:text-lg'>{productData.name}</p>
                                        <p className='text-gray-500'>{currency}{productData.price}</p>
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}

export default Cart