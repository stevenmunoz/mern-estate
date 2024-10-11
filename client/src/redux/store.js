import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'

/*
In summary, this configuration disables the serializable state invariant 
middleware check, allowing the Redux store to handle non-serializable 
data without raising warnings. This can be useful in specific scenarios 
but should be used with caution to avoid potential issues with state 
predictability and debugging.
*/
export const store = configureStore({
  reducer: {user: userReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})