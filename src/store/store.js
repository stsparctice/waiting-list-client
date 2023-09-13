import { configureStore } from '@reduxjs/toolkit'
import SwimmingPools from './swimmingPools'
import Genders from './genders'
import PoolSchedule from './poolSchedule'

export default configureStore({
  reducer: {
    SwimmingPools,
    Genders, 
    PoolSchedule
  },
})