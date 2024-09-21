import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

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