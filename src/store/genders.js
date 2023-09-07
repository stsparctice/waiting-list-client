import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData, postData } from '../services/axios'
import { stateStatus } from './storeStatus'


export const getAllGenders = createAsyncThunk('gr/getAll', async (condition) => {
    const response = await getData('/gender/getAll')
    console.log({ response })
    return response
})

export const addGender = createAsyncThunk('gr/add', async (gender) => {
    try{
    const response = await postData('/gender/add', gender)
    console.log({ response })
    return response.data
    }
    catch (error){
        throw error
    }
})

export const updateGender = createAsyncThunk('gr/update', async (gender) => {
    const response = await postData('/gender/update', gender)
    console.log({ response })
    if (response.status === 204)
        return gender
    else
        return 'error'
})

export const deleteGender = createAsyncThunk('gr/delete', async (gender) => {

    const response = await postData('/gender/delete', gender)
    console.log({ response })
    if (response.status === 200)
        return gender
    else
        return 'error'
})


const initialState = { genders: [], status: stateStatus.EMPTY, onePool: {}, error:'' }


export const gendersSlice = createSlice({
    name: 'genders',
    initialState,
    reducers: {
        selectById: {
            reducer(state, action) {
                console.log(action)
                let find = state.pools.find(p => p.id === action.payload)
                if (find) {
                    state.onePool = find
                    console.log(current(state.onePool))
                }
                else {
                    state.onePool = {}
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllGenders.fulfilled, (state, action) => {
            console.log({ state, action })
            state.pools = action.payload
            state.status = stateStatus.SUCCEEDED
            console.log(current(state))
        })
        builder.addCase(getAllGenders.pending, (state, action) => {
            state.status = stateStatus.LOADING
            console.log(current(state))
        })
        builder.addCase(addGender.fulfilled, (state, action) => {
            console.log({ state, action })
            state.pools.push(action.payload)
        })
        builder.addCase(addGender.rejected, (state, action) => {
            console.log({ state, action })
            state.error= action.error.message
        })
        builder.addCase(updateGender.fulfilled, (state, action) => {
            console.log({ state, action })
            let poolindex = state.pools.findIndex(p => p.id === action.payload.id)
            console.log({ poolindex })
            state.pools[poolindex] = action.payload
        })
        builder.addCase(deleteGender.fulfilled, (state, action) => {
            console.log({ state, action })
            let poolindex = state.pools.findIndex(p => p.id === action.payload.id)
            console.log({ poolindex })
            state.pools.splice(poolindex,1)
        })

    }
})

// Action creators are generated for each case reducer function
export const { selectById } = gendersSlice.actions
export default gendersSlice.reducer


