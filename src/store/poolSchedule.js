import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData, postData } from '../services/axios'
import { stateStatus } from './storeStatus'


export const getAllPoolSchedules = createAsyncThunk('ps/getAll', async (condition) => {
    const response = await getData('/gender/getAll')
    console.log({ response })
    return response
})

export const addPoolSchedule = createAsyncThunk('ps/add', async (poolSchedule, api) => {
    try {
        const response = await postData('/poolSchedule/add', poolSchedule)
        console.log({ response })
        return response.data
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const updatePoolSchedule = createAsyncThunk('ps/update', async (poolSchedule, api) => {
    try {
        const response = await postData('/gender/update', poolSchedule)
        console.log({ response })
        return poolSchedule
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const deletePoolSchedule = createAsyncThunk('ps/delete', async (poolSchedule, api) => {
    try {
    const response = await postData('/gender/delete', poolSchedule)
    console.log({ response })
   
        return poolSchedule
    }
        catch (error) {
            return api.rejectWithValue(error.message)
        }
})


const initialState = { poolSchedules: [], status: stateStatus.EMPTY, poolSchedule: {}, error: '' }


export const poolSchedulesSlice = createSlice({
    name: 'poolSchedules',
    initialState,
    reducers: {
        selectById: {
            reducer(state, action) {
                console.log(action)
                let find = state.poolSchedules.find(p => p.id === action.payload)
                if (find) {
                    state.poolSchedule = find
                    console.log(current(state.poolSchedule))
                }
                else {
                    state.poolSchedule = {}
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllPoolSchedules.fulfilled, (state, action) => {
            console.log({ state, action })
            state.poolSchedules = action.payload
            state.status = stateStatus.SUCCEEDED
            console.log(current(state))
        })
        builder.addCase(getAllPoolSchedules.pending, (state, action) => {
            state.status = stateStatus.LOADING
            console.log(current(state))
        })
        builder.addCase(addPoolSchedule.fulfilled, (state, action) => {
            console.log({ state, action })
            state.poolSchedules.push(action.payload)
        })
        builder.addCase(addPoolSchedule.rejected, (state, action) => {
            console.log({ state, action })
            state.error = action.error.message
        })
        builder.addCase(updatePoolSchedule.fulfilled, (state, action) => {
            console.log({ state, action })
            let poolScheduleIndex = state.poolSchedules.findIndex(g => g.id === action.payload.id)
            console.log({ poolScheduleIndex })
            state.poolSchedules[poolScheduleIndex] = action.payload
        })
        builder.addCase(deletePoolSchedule.fulfilled, (state, action) => {
            console.log({ state, action })
            let poolScheduleIndex = state.poolSchedules.findIndex(g => g.id === action.payload.id)
            console.log({ poolScheduleIndex })
            state.poolSchedules.splice(poolScheduleIndex, 1)
        })

    }
})

// Action creators are generated for each case reducer function
export const { selectById } = poolSchedulesSlice.actions
export default poolSchedulesSlice.reducer


