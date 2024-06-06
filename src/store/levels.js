import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getData, postData } from '../services/axios'
import { stateStatus } from './storeStatus'


export const getAllLevels = createAsyncThunk('lv/getAll', async (condition) => {
    const response = await getData('/levels/getAll')
    return response
})

export const addLevel = createAsyncThunk('lv/add', async (level, api) => {
    try {
        const response = await postData('/levels/add', level)
        return response.data
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const updateLevel = createAsyncThunk('lv/update', async (level, api) => {
    try {
        const response = await postData('/levels/update', level)
        return level
    }
    catch (error) {
        return api.rejectWithValue(error.message)
    }
})

export const deleteLevel = createAsyncThunk('lv/delete', async (level, api) => {
    try {
    const response = await postData('/levels/delete', level)
   
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
                let find = state.levels.find(p => p.id === action.payload)
                if (find) {
                    state.level = find
                }
                else {
                    state.level = {}
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllLevels.fulfilled, (state, action) => {
            state.levels = action.payload
            state.status = stateStatus.SUCCEEDED
        })
        builder.addCase(getAllLevels.pending, (state, action) => {
            state.status = stateStatus.LOADING
        })
        builder.addCase(addLevel.fulfilled, (state, action) => {
            state.levels.push(action.payload)
        })
        builder.addCase(addLevel.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder.addCase(updateLevel.fulfilled, (state, action) => {
            let levelIndex = state.levels.findIndex(g => g.id === action.payload.id)
            state.levels[levelIndex] = action.payload
        })
        builder.addCase(deleteLevel.fulfilled, (state, action) => {
            let levelIndex = state.levels.findIndex(g => g.id === action.payload.id)
            state.levels.splice(levelIndex, 1)
        })

    }
})

// Action creators are generated for each case reducer function
export const { selectById } = levelsSlice.actions
export default levelsSlice.reducer


