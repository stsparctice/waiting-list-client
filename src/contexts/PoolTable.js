import { createContext } from "react";
export const PoolTable = (state, item) => {
    if(!state.gender&&item.gender){
        state.gender=item.gender
    }
    if(!state.pool&&item.pool){
        state.pool=item.pool
    }
    if (!item.gender && item.pool !== undefined) {
        state.pool = item.pool
    }
    if (!item.pool && item.gender !== undefined) {
        state.gender = item.gender

    }
    return state
}

const PoolTableContext = createContext();
export default PoolTableContext;