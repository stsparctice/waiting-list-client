import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData, postData } from '../services/axios'
import { stateStatus } from './storeStatus'


export const getAllGenders = createAsyncThunk('gr/getAll', async (condition) => {
    const response = await getData('/genders/getAll')
    return response
})

export const addGender = createAsyncThunk('gr/add', async (gender, api) => {
    try {
        const response = await postData('/genders/add', gender)
        return response.data
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const updateGender = createAsyncThunk('gr/update', async (gender, api) => {
    try {
        const response = await postData('/genders/update', gender)
        return gender
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const deleteGender = createAsyncThunk('gr/delete', async (gender, api) => {
    try {
    const response = await postData('/genders/delete', gender)
   
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
                let find = state.genders.find(p => p.id === action.payload)
                if (find) {
                    state.gender = find
                }
                else {
                    state.gender = {}
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllGenders.fulfilled, (state, action) => {
            state.genders = action.payload
            state.status = stateStatus.SUCCEEDED
        })
        builder.addCase(getAllGenders.pending, (state, action) => {
            state.status = stateStatus.LOADING
        })
        builder.addCase(addGender.fulfilled, (state, action) => {
            state.genders.push(action.payload)
        })
        builder.addCase(addGender.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder.addCase(updateGender.fulfilled, (state, action) => {
            let genderIndex = state.genders.findIndex(g => g.id === action.payload.id)
            state.genders[genderIndex] = action.payload
        })
        builder.addCase(deleteGender.fulfilled, (state, action) => {
            let genderIndex = state.genders.findIndex(g => g.id === action.payload.id)
            state.genders.splice(genderIndex, 1)
        })

    }
})

// Action creators are generated for each case reducer function
export const { selectById } = gendersSlice.actions
export default gendersSlice.reducer


