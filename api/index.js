import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'; 
import authRouter from './routes/auth.route.js';  

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.log(error);
    });

const app = express();
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});  

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Error handling middleware
//It's important to note that this middleware function should be defined after all other route handlers and middleware functions, 
//as it will only be executed if an error occurs in the previous middleware or route handlers.
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ 
        success: false,
        statusCode,
        message 
    });
}); 

