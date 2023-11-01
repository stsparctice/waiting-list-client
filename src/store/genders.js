import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData, postData } from '../services/axios'
import { stateStatus } from './storeStatus'


export const getAllGenders = createAsyncThunk('gr/getAll', async (condition) => {
    const response = await getData('/genders/getAll')
    console.log({ response })
    return response
})

export const addGender = createAsyncThunk('gr/add', async (gender, api) => {
    try {
        const response = await postData('/genders/add', gender)
        console.log({ response })
        return response.data
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const updateGender = createAsyncThunk('gr/update', async (gender, api) => {
    try {
        const response = await postData('/genders/update', gender)
        console.log({ response })
        return gender
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const deleteGender = createAsyncThunk('gr/delete', async (gender, api) => {
    try {
    const response = await postData('/genders/delete', gender)
    console.log({ response })
   
        return gender
    }
        catch (error) {
            return api.rejectWithValue(error.message)
        }
})


const initialState = { genders: [], status: stateStatus.EMPTY, gender: {}, error: '' }


export const gendersSlice = createSlice({
    name: 'genders',
    initialState,
    reducers: {
        selectById: {
            reducer(state, action) {
                console.log(action)
                let find = state.genders.find(p => p.id === action.payload)
                if (find) {
                    state.gender = find
                    console.log(current(state.gender))
                }
                else {
                    state.gender = {}
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllGenders.fulfilled, (state, action) => {
            console.log({ state, action })
            state.genders = action.payload
            state.status = stateStatus.SUCCEEDED
            console.log(current(state))
        })
        builder.addCase(getAllGenders.pending, (state, action) => {
            state.status = stateStatus.LOADING
            console.log(current(state))
        })
        builder.addCase(addGender.fulfilled, (state, action) => {
            console.log({ state, action })
            state.genders.push(action.payload)
        })
        builder.addCase(addGender.rejected, (state, action) => {
            console.log({ state, action })
            state.error = action.error.message
        })
        builder.addCase(updateGender.fulfilled, (state, action) => {
            console.log({ state, action })
            let genderIndex = state.genders.findIndex(g => g.id === action.payload.id)
            console.log({ genderIndex })
            state.genders[genderIndex] = action.payload
        })
        builder.addCase(deleteGender.fulfilled, (state, action) => {
            console.log({ state, action })
            let genderIndex = state.genders.findIndex(g => g.id === action.payload.id)
            console.log({ genderIndex })
            state.genders.splice(genderIndex, 1)
        })

    }
})

// Action creators are generated for each case reducer function
export const { selectById } = gendersSlice.actions
export default gendersSlice.reducer


