import { configureStore } from '@reduxjs/toolkit'
import SwimmingPools from './swimmingPools'
import Genders from './genders'

export default configureStore({
  reducer: {
    SwimmingPools,
    Genders
  },
})