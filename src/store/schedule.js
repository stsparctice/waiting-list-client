import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData, postData } from '../services/axios'
import { stateStatus } from './storeStatus'


export const getAllSchedules = createAsyncThunk('ps/getAllActiveHours', async (poolId, condition, api) => {
    try {
        const response = await getData(`/schedule/getAllActiveHours/${poolId}`, condition)
        console.log({ response })
        return response
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const addSchedule = createAsyncThunk('ps/add', async (poolSchedule, api) => {
    try {
        const response = await postData('/schedule/add', poolSchedule)
        console.log({ response })
        return response.data
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const updateSchedule = createAsyncThunk('ps/update', async (poolSchedule, api) => {
    try {
        const response = await postData('/schedule/update', poolSchedule)
        console.log({ response })
        return poolSchedule
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const deleteSchedule = createAsyncThunk('ps/delete', async (poolSchedule, api) => {
    try {
        const response = await postData('/schedule/delete', poolSchedule)
        console.log({ response })

        return poolSchedule
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})


const initialState = { selectedPool: {}, allSchedules: [], status: stateStatus.EMPTY, selectedPoolSchedule: {}, error: '' }


export const schedulesSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {
        selectById: {
            reducer(state, action) {
                console.log(action)

                let find = state.allSchedules.find(p => p.id === action.payload)
                if (find) {
                    state.selectedPoolSchedule = find
                    console.log(current(state.selectedPoolSchedule))
                }
                else {
                    state.selectedPoolSchedule = {}
                }
            }
        },
        setSelectedPool: {

            reducer(state, action) {
                console.log(action)
                console.log(current(state))
                state.selectedPool = action.payload
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllSchedules.fulfilled, (state, action) => {
            console.log({ state, action })
            state.allSchedules = action.payload
            state.status = stateStatus.SUCCEEDED
            console.log(current(state))
        })
        builder.addCase(getAllSchedules.pending, (state, action) => {
            state.status = stateStatus.LOADING
            console.log(current(state))
        })
        builder.addCase(addSchedule.fulfilled, (state, action) => {
            console.log({ state, action })
            state.allSchedules.push(action.payload)
        })
        builder.addCase(addSchedule.rejected, (state, action) => {
            console.log({ state, action })
            state.error = action.error.message
        })
        builder.addCase(updateSchedule.fulfilled, (state, action) => {
            console.log({ state, action })
            let poolScheduleIndex = state.allSchedules.findIndex(g => g.id === action.payload.id)
            console.log({ poolScheduleIndex })
            state.allSchedules[poolScheduleIndex] = action.payload
        })
        builder.addCase(deleteSchedule.fulfilled, (state, action) => {
            console.log({ state, action })
            let poolScheduleIndex = state.allSchedules.findIndex(g => g.id === action.payload.id)
            console.log({ poolScheduleIndex })
            state.allSchedules.splice(poolScheduleIndex, 1)
        })

    }
})

// Action creators are generated for each case reducer function
export const { selectById, setSelectedPool } = schedulesSlice.actions
export default schedulesSlice.reducer


