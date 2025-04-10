
import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

// This file contains the product controller functions for handling product-related operations in the application.

// API endpoint to add a new product
// This endpoint allows the user to add a new product to the database.
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
        const { files } = req;

        const image1 = files.image1 && files.image1[0];
        const image2 = files.image2 && files.image2[0];
        const image3 = files.image3 && files.image3[0];
        const image4 = files.image4 && files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
        
        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'});
                return {
                    url: result.secure_url,
                    cloudinary_id: result.public_id,
                };
            })
        );

        const imageUrls = imagesUrl.map((item) => item.url);
        const cloudinaryIds = imagesUrl.map((item) => item.cloudinary_id);

        // Validate product data
        if (!name || !description || !price || !category || !brand || !stock) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create new product

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory, 
            bestSeller: bestSeller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imageUrls,
            date: Date.now(),
            cloudinary_id: cloudinaryIds,
        }

        const newProduct = new productModel(productData);
        await newProduct.save();
        res.status(201).json({ success: true, product: newProduct, message: 'Product created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// API endpoint to get all products
// This endpoint retrieves all products from the database.
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// API endpoint to get a single product by ID
// This endpoint retrieves a product from the database based on its ID.
const getProductById = async (req, res) => {
    try {
        // const { id } = req.params;
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API endpoint to update a product
// This endpoint updates a product in the database based on its ID.
// const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description, price, category, brand, stock } = req.body;
//         const { file } = req;

//         // Validate product data
//         if (!name || !description || !price || !category || !brand || !stock) {
//             return res.status(400).json({ message: 'Please provide all required fields' });
//         }

//         const product = await productModel.findById(id);
//         if (!product) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }

//         // Update image if a new one is provided
//         if (file) {
//             await cloudinary.uploader.destroy(product.cloudinary_id);
//             const result = await cloudinary.uploader.upload(file.path);
//             product.image = result.secure_url;
//             product.cloudinary_id = result.public_id;
//         }

//         product.name = name;
//         product.description = description;
//         product.price = price;
//         product.category = category;
//         product.brand = brand;
//         product.stock = stock;

//         await product.save();
//         res.status(200).json({ success: true, product });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

const updateProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
        const { files } = req;

        const image1 = files.image1 && files.image1[0];
        const image2 = files.image2 && files.image2[0];
        const image3 = files.image3 && files.image3[0];
        const image4 = files.image4 && files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
        
        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'});
                return {
                    url: result.secure_url,
                    cloudinary_id: result.public_id,
                };
            })
        );

        const imageUrls = imagesUrl.map((item) => item.url);
        const cloudinaryIds = imagesUrl.map((item) => item.cloudinary_id);

        // Validate product data
        if (!name || !description || !price || !category || !subCategory || !sizes) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Update image if a new one is provided
        if (files) {
            await cloudinary.uploader.destroy(product.cloudinary_id);
            product.image = imageUrls;
            product.cloudinary_id = cloudinaryIds;
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.category = category;
        product.subCategory = subCategory; 
        product.sizes = JSON.parse(sizes);
        product.bestSeller = bestSeller === 'true' ? true : false;

        await product.save();
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}



// API endpoint to remove a product
// This endpoint deletes a product from the database based on its ID.
// const deleteProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await productModel.findById(id);
//         if (!product) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         await cloudinary.uploader.destroy(product.cloudinary_id);
//         await productModel.findByIdAndDelete(id);
//         res.status(200).json({ success: true, message: 'Product deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        await cloudinary.uploader.destroy(product.cloudinary_id);
        await productModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };