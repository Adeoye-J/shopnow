import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Route to create a new product
productRouter.post('/add', upload.fields([ {name: "image1", adminAuth, maxCount: 1}, {name: "image2", maxCount: 1}, {name: "image3", maxCount: 1}, {name: "image4", maxCount: 1} ]), createProduct);
// Route to get all products
productRouter.get('/list-product', getAllProducts);
// Route to get a product by ID
productRouter.get('/single', getProductById);
// Route to update a product by ID
productRouter.put('/update', adminAuth, updateProduct);
// Route to delete a product by ID
productRouter.delete('/remove', adminAuth, deleteProduct);


export default productRouter;