import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData, postData } from '../services/axios'
import { stateStatus } from './storeStatus'


export const getAllLevels = createAsyncThunk('lv/getAll', async (condition) => {
    const response = await getData('/levels/getAll')
    console.log({ response })
    return response
})

export const addLevel = createAsyncThunk('lv/add', async (level, api) => {
    try {
        const response = await postData('/levels/add', level)
        console.log({ response })
        return response.data
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const updateLevel = createAsyncThunk('lv/update', async (level, api) => {
    try {
        const response = await postData('/levels/update', level)
        console.log({ response })
        return level
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const deleteLevel = createAsyncThunk('lv/delete', async (level, api) => {
    try {
    const response = await postData('/levels/delete', level)
    console.log({ response })
   
        return level
    }
        catch (error) {
            return api.rejectWithValue(error.message)
        }
})


const initialState = { levels: [], status: stateStatus.EMPTY, level: {}, error: '' }


export const levelsSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {
        selectById: {
            reducer(state, action) {
                console.log(action)
                let find = state.levels.find(p => p.id === action.payload)
                if (find) {
                    state.level = find
                    console.log(current(state.level))
                }
                else {
                    state.level = {}
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllLevels.fulfilled, (state, action) => {
            console.log({ state, action })
            state.levels = action.payload
            state.status = stateStatus.SUCCEEDED
            console.log(current(state))
        })
        builder.addCase(getAllLevels.pending, (state, action) => {
            state.status = stateStatus.LOADING
            console.log(current(state))
        })
        builder.addCase(addLevel.fulfilled, (state, action) => {
            console.log({ state, action })
            state.levels.push(action.payload)
        })
        builder.addCase(addLevel.rejected, (state, action) => {
            console.log({ state, action })
            state.error = action.error.message
        })
        builder.addCase(updateLevel.fulfilled, (state, action) => {
            console.log({ state, action })
            let levelIndex = state.levels.findIndex(g => g.id === action.payload.id)
            console.log({ levelIndex })
            state.levels[levelIndex] = action.payload
        })
        builder.addCase(deleteLevel.fulfilled, (state, action) => {
            console.log({ state, action })
            let levelIndex = state.levels.findIndex(g => g.id === action.payload.id)
            console.log({ levelIndex })
            state.levels.splice(levelIndex, 1)
        })

    }
})

// Action creators are generated for each case reducer function
export const { selectById } = levelsSlice.actions
export default levelsSlice.reducer


