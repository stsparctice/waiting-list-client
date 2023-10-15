import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData, postData } from '../services/axios'
import { stateStatus } from './storeStatus'


export const getAllTeachers = createAsyncThunk('teachers/getAll', async (url, api) => {
    try {
        const response = await getData('/teachers/all')
        return response
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const addTeacher = createAsyncThunk('teachers/add', async (teacher, api) => {
    try {
        const response = await postData('/teachers/insert', teacher)
        console.log(response)
        return response.data
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const updateTeacher = createAsyncThunk('teachers/update', async (teacher, api) => {
    try {
        const response = await postData('/teachers/update', teacher)
        console.log({ response })

        return teacher
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const deleteTeacher = createAsyncThunk('teachers/delete', async (teacher, api) => {
    try {
        const response = await postData('/teachers/delete', teacher)
        console.log({ response })
        return teacher
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})


const initialState = { teachers: [], status: stateStatus.EMPTY, teacher: {}, error: '' }


export const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        selectById: {
            reducer(state, action) {
                console.log(action)
                let find = state.teachers.find(t => t.id === action.payload)
                if (find) {
                    state.teacher = find
                    console.log(current(state.teacher))
                }
                else {
                    state.teacher = {}
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllTeachers.fulfilled, (state, action) => {
            state.teachers = action.payload
            state.status = stateStatus.SUCCEEDED
            console.log(current(state))
        })
        builder.addCase(getAllTeachers.pending, (state, action) => {
            state.status = stateStatus.LOADING
            console.log(current(state))
        })
        builder.addCase(addTeacher.fulfilled, (state, action) => {
            console.log({ state, action })
            state.teachers.push(action.payload)
        })
        builder.addCase(addTeacher.rejected, (state, action) => {
            console.log({ state, action })
            state.error = action.error.message
        })
        builder.addCase(updateTeacher.fulfilled, (state, action) => {
            console.log({ state, action })
            let teacherindex = state.teachers.findIndex(t => t.id === action.payload.id)
            console.log({ teacherindex })
            state.teachers[teacherindex] = action.payload
        })
        builder.addCase(deleteTeacher.fulfilled, (state, action) => {
            console.log({ state, action })
            let teacherindex = state.teachers.findIndex(t => t.id === action.payload.id)
            console.log({ teacherindex })
            state.teachers.splice(teacherindex, 1)
        })

    }
})

// Action creators are generated for each case reducer function
export const { selectById } = teachersSlice.actions
export default teachersSlice.reducer


