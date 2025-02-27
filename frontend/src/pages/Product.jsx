import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Product = () => {

    const {productId} = useParams()
    const {products} = useContext(ShopContext)
    const [productData, setProductData] = useState(false)

    const fetchProductData = () => {

        const productItem = products.find((item) => item._id === productId)
        setProductData(productItem)
        console.log(productItem)

    }

    useEffect(() => {
        fetchProductData()
    }, [productId])

    return productData && (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            
            {/* Product Data */}
            <div className="flex gap-12 flex-col sm:flex-row">

                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {
                            productData.image.map((item, index) => (
                                <img src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                            ))
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Product