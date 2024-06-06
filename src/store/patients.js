// const express = require('express');

// const router = require('express').Router()
// const { readDetails } = require('../modules/rapidMed')

// router.get('/find', async (req, res) => {
//         patient= await readDetails(req.query.id)
//         res.status(200).send(patient)
//     }
//     catch (error) {
//         res.status(404).send(error)
//     }
// })

// module.exports = router 

import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData } from '../services/axios'
import { stateStatus } from './storeStatus'



export const getPatientById = createAsyncThunk('/getObjectById', async (id,api) => {
    // try {
        const response = await getData(`rapidMed/find?id=${id}`)
        return response
    // }
    // catch (error) {
    //     return api.rejectWithValue(error.message)
    // }
})

const initialState = { selectedPatient:undefined, status:stateStatus.EMPTY }

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        selectById: {
            reducer(state, action) {
                let find = state.patient.find(p => p.id === action.payload)
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getPatientById.fulfilled, (state, action) => {
            state.selectedPatient = action.payload
            state.status = stateStatus.SUCCEEDED
        })
    }
})

// export const { selectById } = swimmingPoolsSlice.actions
export default patientSlice.reducer