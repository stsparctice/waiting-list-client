import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData, postData } from '../services/axios'
import { stateStatus } from './storeStatus'


export const getAllPools = createAsyncThunk('sp/getAll', async (url) => {
    const response = await getData(url)
    console.log({ response })
    return response
})

export const addSwimmingPool = createAsyncThunk('sp/add', async (swimmingPool) => {
    try{
    const response = await postData('/pool/add', swimmingPool)
    console.log({ response })
    return response.data
    }
    catch (error){
        throw error
    }
})

export const updateSwimmingPool = createAsyncThunk('sp/update', async (swimmingPool) => {
    const response = await postData('/pool/update', swimmingPool)
    console.log({ response })
    if (response.status === 204)
        return swimmingPool
    else
        return 'error'
})


const initialState = { pools: [], status: stateStatus.EMPTY, onePool: {}, error:'' }


export const swimmingPoolsSlice = createSlice({
    name: 'swimmingpools',
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
        builder.addCase(getAllPools.fulfilled, (state, action) => {
            console.log({ state, action })
            state.pools = action.payload
            state.status = stateStatus.SUCCEEDED
            console.log(current(state))
        })
        builder.addCase(getAllPools.pending, (state, action) => {
            state.status = stateStatus.LOADING
            console.log(current(state))
        })
        builder.addCase(addSwimmingPool.fulfilled, (state, action) => {
            console.log({ state, action })
            state.pools.push(action.payload)
        })
        builder.addCase(addSwimmingPool.rejected, (state, action) => {
            console.log({ state, action })
            state.error= action.error.message
        })
        builder.addCase(updateSwimmingPool.fulfilled, (state, action) => {
            console.log({ state, action })
            let poolindex = state.pools.findIndex(p => p.id === action.payload.id)
            console.log({ poolindex })
            state.pools[poolindex] = action.payload
        })

    }
})

// Action creators are generated for each case reducer function
export const { selectById } = swimmingPoolsSlice.actions
export default swimmingPoolsSlice.reducer


