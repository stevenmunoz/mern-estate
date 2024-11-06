import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'; // Import necessary Firebase authentication functions
import { app } from '../firebase'; // Import the Firebase app instance
import { useDispatch } from 'react-redux'; // Import useDispatch hook from react-redux
import { signInSuccess } from '../redux/user/userSlice'; // Import the signInSuccess action from the user slice
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

export default function OAuth() {
    const dispatch = useDispatch(); // Initialize dispatch function
    const navigate = useNavigate(); // Initialize navigate function

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider(); // Create a new GoogleAuthProvider instance
            const auth = getAuth(app); // Get the auth instance from the Firebase app

            const result = await signInWithPopup(auth, provider); // Sign in with Google using a popup

            // Send the user data to the backend for further processing
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json(); // Parse the response data
            dispatch(signInSuccess(data)); // Dispatch the signInSuccess action with the received data
            navigate('/profile'); // Navigate to the home page
        } catch (error) {
            console.log('could not sign in with google', error); // Log any errors that occur during the sign-in process
        }
    };

    return (
        <button
            onClick={handleGoogleClick} // Attach the handleGoogleClick function to the button's onClick event
            type='button'
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
            Continue with google
        </button>
    );
}