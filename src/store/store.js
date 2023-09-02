import { configureStore } from '@reduxjs/toolkit'
import SwimmingPools from './swimmingPools'

export default configureStore({
  reducer: {
    SwimmingPools,
  },
})