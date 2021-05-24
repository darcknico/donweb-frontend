import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import commonSlice from './slices/commonSlice'

export default configureStore({
  reducer: {
    cart: cartSlice,
    common: commonSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
})