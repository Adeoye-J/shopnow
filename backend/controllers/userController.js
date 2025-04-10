
// Route for user registration and login
import userModel from '../models/userModel.js';
import validator from 'validator';
import cloudinary from '../config/cloudinary.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate user credentials
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check if user exists in the database
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = createToken(user._id);
        res.status(200).json({ success: true, token, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validate user data
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ success: false, message: 'Password must contain at least one uppercase letter' });
        }
        // Hash password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        // // Upload profile picture to Cloudinary
        // const image = req.files.image;
        // const result = await cloudinary.uploader.upload(image.tempFilePath, {
        //     folder: 'profile_pictures',
        //     width: 150,
        //     crop: 'scale',
        // });

        // Create new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // Generate JWT token
        const token = createToken(user._id);
        res.status(201).json(
            { 
                success: true,
                message: 'User registered successfully',
                token, 
                // userId: user._id 
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate user credentials
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        // Check if user exists in the database

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate JWT token
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.status(200).json({ success: true, token, message: 'Login successful' });
        }
        // If user is not admin, return error
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export { loginUser, registerUser, adminLogin };