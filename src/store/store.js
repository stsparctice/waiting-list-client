import { configureStore } from '@reduxjs/toolkit'
import SwimmingPools from './swimmingPools'
import Genders from './genders'
import Schedule from './schedule'

export default configureStore({
  reducer: {
    SwimmingPools,
    Genders, 
    Schedule
  },
})