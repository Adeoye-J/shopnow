import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

// App Config
const app = express();
const PORT = process.env.PORT || 5000;
connectDB()
connectCloudinary()

// middlewares
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(express.json());
app.use(cors(corsOptions));

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) => {
    res.send('API Endpoint Active')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});