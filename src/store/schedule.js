import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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


    // days.forEach(day => {
    //     day.schedules.sort((h1, h2) => 

    //          h1.startHour.getTime() < h2.startHour.getTime()
    //     )

    // })



    return days

}



export const getAllSchedules = createAsyncThunk('ps/getAllActiveHours', async (poolId, api) => {
    try {
        const response = await getData(`/schedules/getAllActiveHours/${poolId}`)
        return response
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const addSchedule = createAsyncThunk('ps/add', async (poolSchedule, api) => {
    try {
        const response = await postData('/schedules/addGenderHour', poolSchedule)
        return response.data
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const updateSchedule = createAsyncThunk('ps/update', async (poolSchedule, api) => {
    try {
        const response = await postData('/schedules/update', poolSchedule)
        if (response.status === 200) {
            const { data } = response
            if (data.id !== poolSchedule.id) {

                return { action: 'replace', id: poolSchedule.id, data }
            }
            else {
                return { action: 'update', data: poolSchedule }
            }
        }
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const deleteSchedule = createAsyncThunk('ps/delete', async (poolSchedule, api) => {
    try {
        await postData('/schedules/delete', poolSchedule)

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

                let find = state.allSchedules.find(p => p.id === action.payload)
                if (find) {
                    state.selectedPoolSchedule = find
                }
                else {
                    state.selectedPoolSchedule = {}
                }
            }
        },
        setSelectedPool: {

            reducer(state, action) {
                state.selectedPool = action.payload
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllSchedules.fulfilled, (state, action) => {
            const answer = action.payload
            state.allSchedules = buildSchedule(answer)
            state.status = stateStatus.SUCCEEDED
        })
        builder.addCase(getAllSchedules.pending, (state, action) => {
            state.status = stateStatus.LOADING
        })
        builder.addCase(addSchedule.fulfilled, (state, action) => {

            const day = state.allSchedules.find(d => d.day.number === action.payload.day)
            if (day)
                day.schedules.push(action.payload)
        })
        builder.addCase(addSchedule.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder.addCase(updateSchedule.fulfilled, (state, action) => {
            console.log(action.payload)
            const day = state.allSchedules.find(d => d.day.number === action.payload.data.day)
            console.log({day});
            switch (action.payload.action) {
                case 'replace':
                    //TODO arrange this point
                    if (day) {
                        let poolScheduleIndex = state.allSchedules.findIndex(g => g.id === action.payload.id)
                        day.schedules.splice(poolScheduleIndex, 1,action.payload.data)
                    }
                    break
                case 'update':
                    break
                default:
                    break

            }
        })
        builder.addCase(deleteSchedule.fulfilled, (state, action) => {
            let poolScheduleIndex = state.allSchedules.findIndex(g => g.id === action.payload.id)
            state.allSchedules.splice(poolScheduleIndex, 1)
        })

    }
})

// Action creators are generated for each case reducer function
export const { selectById, setSelectedPool } = schedulesSlice.actions
export default schedulesSlice.reducer


