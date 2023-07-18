import { createContext } from "react";
export const PoolTable = (state, item) => {
    console.log(state, 'stateBEFOREEEEEEEEEEEEEEEEE');
    console.log(item, 'itemBEFFFFFFFFFFFFFFOR');
    if(!state.gender&&item.gender){
        state.gender=item.gender
    }
    if(!state.pool&&item.pool){
        state.pool=item.pool
    }
    if (!item.gender && item.pool != undefined) {
        state.pool = item.pool
    }
    if (!item.pool && item.gender != undefined) {
        state.gender = item.gender

    }
    console.log({ state },'stateAFTERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
    console.log({ item }, 'itemAFTERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
    return state
}

const PoolTableContext = createContext();
export default PoolTableContext;