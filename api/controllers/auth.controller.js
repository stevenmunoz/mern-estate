import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body; // Destructure the username, email and password from req.body
    const hashedPassword = bcryptjs.hashSync(password, 10); // Hash the password
    const newUser = new User({ username, email, password:hashedPassword }); // Create a new user with the username, email and password
    await newUser.save() // Save the new user
        .then(() => res.json({ message: 'User signed up successfully!' })) // If successful, send a message
        .catch(err => res.status(400).json({ error: err })); // If an error occurs, send the erro
};