import { configureStore } from '@reduxjs/toolkit'
import SwimmingPools from './swimmingPools'
import Genders from './genders'
import Schedule from './schedule'
import Teachers from './teachers'

export default configureStore({
  reducer: {
    SwimmingPools,
    Genders, 
    Schedule, 
    Teachers
  },
})