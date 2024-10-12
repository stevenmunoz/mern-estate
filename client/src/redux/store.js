// Import necessary functions and modules from Redux Toolkit and other libraries
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import { version } from 'mongoose'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'  

// Configuration object for redux-persist
const persistConfig = {
    key: 'root', // Key for the persisted state in storage
    storage,     // Storage engine to use (localStorage in this case)
    version      // Version of the persisted state
}

// Combine all reducers into a root reducer
const rootReducer = combineReducers({ user: userReducer })

// Create a persisted reducer using the persistConfig and rootReducer
const persitedReducer = persistReducer(persistConfig, rootReducer)

// Configure the Redux store with the persisted reducer and middleware
export const store = configureStore({
    reducer: persitedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check for actions and state
    }),
})

// Create a persistor to persist and rehydrate the store
export const persistor = persistStore(store)