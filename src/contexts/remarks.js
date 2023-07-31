import { createContext } from "react";

export const reduceRemarks = (state, item) => {
    if (state.find(s => s === item) === undefined) {
        state = [...state, item]
    }
    return state
}

const RemarksContext = createContext()

export default RemarksContext;