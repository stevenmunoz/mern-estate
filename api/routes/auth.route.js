import express from 'express';
import { signup, signin, testauth } from '../controllers/auth.controller.js'; // Import the signup function from the controller

const router = express.Router(); // Create a new router

router.post('/signup', signup); // Add a new route to the router
router.post('/signin', signin); // Add a new route to the router
router.get('/testauth', testauth); // Add a new route to the router

export default router; // Export the router so it can be used in other files     