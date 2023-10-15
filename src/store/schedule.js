import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData, postData } from '../services/axios'
import { stateStatus } from './storeStatus'
import { hebrewWeekDays } from '../services/dateAndTime'


const buildSchedule = scheduleDays => {
    const days = hebrewWeekDays.map(({ number, name }) => ({ day: { number, name }, schedules: [] }))
    // scheduleDays = scheduleDays.map(day => ({ ...day, startHour: new Date(day.startHour), endHour: new Date(day.endHour) }))
    scheduleDays.forEach((item) => {
        const day = days.find((d) => d.day.number === item.day)
        if (day) {
            day.schedules.push(item)
        }

    })

    console.log({ scheduleDays })

    // days.forEach(day => {
    //     day.schedules.sort((h1, h2) => 

    //          h1.startHour.getTime() < h2.startHour.getTime()
    //     )

    // })



    return days

}



export const getAllSchedules = createAsyncThunk('ps/getAllActiveHours', async (poolId, api) => {
    try {
        const response = await getData(`/schedule/getAllActiveHours/${poolId}`)
        console.log({ response })
        return response
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const addSchedule = createAsyncThunk('ps/add', async (poolSchedule, api) => {
    try {
        const response = await postData('/schedule/addGenderHour', poolSchedule)
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
                state.selectedPool = action.payload
                console.log(current(state))
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllSchedules.fulfilled, (state, action) => {
            console.log({ state, action })
            const answer = action.payload
            state.allSchedules = buildSchedule(answer)
            state.status = stateStatus.SUCCEEDED
            console.log(current(state))
        })
        builder.addCase(getAllSchedules.pending, (state, action) => {
            state.status = stateStatus.LOADING
        })
        builder.addCase(addSchedule.fulfilled, (state, action) => {
            console.log({ state, action })

            const day = state.allSchedules.find(d => d.day.number === action.payload.day)
            console.log({ day })
            if (day)
                day.schedules.push(action.payload)
            console.log(current(state))
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


