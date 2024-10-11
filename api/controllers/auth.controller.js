import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const testauth = (req, res) => {
    res.json({ message: 'API Route for auth working!' });
};

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body; // Destructure the username, email and password from req.body
    const hashedPassword = bcryptjs.hashSync(password, 10); // Hash the password
    const newUser = new User({ username, email, password:hashedPassword }); // Create a new user with the username, email and password
    
    try {
        await newUser.save() // Save the new user
        res.status(201).json({ message: 'User signed up successfully!' }); // If successful, send a message
    } catch (error) {  
        next(error); // If there is an error, pass it to the error handling middleware
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body; // Destructure the email and password from req.body
    try {
        const validUser = await User.findOne({ email }); // Find the user by email
        if (!validUser) { // If the user is not found
            return next(errorHandler(404, 'User not found!')); // Return an error
        } 
        const isMatch = bcryptjs.compareSync(password, validUser.password); // Compare the password with the hashed password
        if (!isMatch) { // If the password does not match
            return next(errorHandler(400, 'Invalid password!')); // Return an error
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Create a token    
        const { password: pass, ...userDetails } = validUser._doc; // Destructure the password from the user object
        res.cookie('token', token, { httpOnly: true }).status(200).json({userDetails}); // Set the token in a cookie

    } catch (error) {  
        next(error); // If there is an error, pass it to the error handling middleware
    }
};