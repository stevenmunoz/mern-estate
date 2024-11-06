import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

// Define the PrivateRoute component
export default function PrivateRoute() {
    // Get the currentUser from the Redux store
    const { currentUser } = useSelector(state => state.user) 
    
    // If currentUser exists, render the Outlet component (child routes)
    // Otherwise, navigate to the sign-in page
    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />   
}
