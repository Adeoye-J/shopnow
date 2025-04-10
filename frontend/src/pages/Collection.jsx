import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

    const {products, search, showSearch} = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])

    const [sortType, setSortType] = useState("relevance")

    const toggleCategory = (e) => {
        
        if (category.includes(e.target.value)) {
            setCategory(prevCategory => prevCategory.filter((item) => item !== e.target.value))
        } else {
            setCategory(prevCategory => [...prevCategory, e.target.value])
        }

    }

    const toggleSubCategory = (e) => {

        if (subCategory.includes(e.target.value)) {
            setSubCategory(prevSubCategory => prevSubCategory.filter((item) => item !== e.target.value))
        } else {
            setSubCategory(prevSubCategory => [...prevSubCategory, e.target.value])
        }
    }

    const applyFilter = () => {
        
        // let productsCopy = products;
        let productsCopy = products.slice()
        
        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) => category.includes(item.category))
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
        }

        if (showSearch && search) {
            productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        setFilteredProducts(productsCopy)

    }

    const sortProduct = () => {

        const filteredProductsCopy = filteredProducts.slice()

        if (sortType === "low-high") {
            setFilteredProducts(filteredProductsCopy.sort((a, b) => (a.price - b.price)))
        } else if (sortType === "high-low") {
            setFilteredProducts(filteredProductsCopy.sort((a, b) => (b.price - a.price)))
        } else {
            applyFilter()
        }
    }

    useEffect(() => {
        sortProduct()
    }, [sortType])

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search])

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            
            {/* Filter Options */}
            <div className="min-w-60">
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
                </p>

                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className='flex gap-2'>
                            <input onChange={toggleCategory} type="checkbox" className='w-3' value="Men" /> Men
                        </p>
                        <p className='flex gap-2'>
                            <input onChange={toggleCategory} type="checkbox" className='w-3' value="Women" /> Women
                        </p>
                        <p className='flex gap-2'>
                            <input onChange={toggleCategory} type="checkbox" className='w-3' value="Kids" /> Kids
                        </p>
                    </div>
                </div>

                {/* SubCategory Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>SUBCATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className='flex gap-2'>
                            <input onChange={toggleSubCategory} type="checkbox" className='w-3' value="Topwear" /> Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input onChange={toggleSubCategory} type="checkbox" className='w-3' value="Bottomwear" /> Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input onChange={toggleSubCategory} type="checkbox" className='w-3' value="Winterwear" /> Winterwear
                        </p>
                    </div>
                </div>

            </div>


            {/* Main Section */}

            <div className="flex-1">

                <div className="flex flex-col sm:flex-row justify-between text-base sm:text-2xl mb-4">
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />

                    {/* Product Sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 h-12' name="" id="">
                        <option value="relevance">Sort by: Relevance</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Products View */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {
                        filteredProducts.map((item, index) => (
                            <ProductItem key={index} id={item._id} price={item.price} image={item.image} name={item.name} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection