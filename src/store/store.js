import { configureStore } from '@reduxjs/toolkit'
import SwimmingPools from './swimmingPools'
import Genders from './genders'
import Schedule from './schedule'
import Patients from './patients'

export default configureStore({
  reducer: {
    SwimmingPools,
    Genders, 
    Schedule,
    Patients
  },
})