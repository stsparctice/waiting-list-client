// const express = require('express');

// const router = require('express').Router()
// const { readDetails } = require('../modules/rapidMed')

// router.get('/find', async (req, res) => {
// console.log('find')
//     try {
//         patient= await readDetails(req.query.id)
//         console.log('patient',patient);
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
    console.log("i am in the store!!!!!!!!!!!!!");
    // console.log(req.query,'id');
    // try {
        const response = await getData(`rapidMed/find?id=${id}`)
        console.log(response,'data........................................');
        return response.data
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
                console.log(state,'state')
                let find = state.patient.find(p => p.id === action.payload)
                console.log(find);
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getPatientById.fulfilled, (state, action) => {
            state.selectedPatient = action.payload
            state.status = stateStatus.SUCCEEDED
            console.log(current(state))
        })
    }
})

// export const { selectById } = swimmingPoolsSlice.actions
export default patientSlice.reducer