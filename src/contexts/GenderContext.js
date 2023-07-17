import { createContext } from "react";

export const updateGenders = (state, item) => {
    item.forEach(i => {
        switch (i.status) {
            case undefined:
                state = [...state, i]
                break;
            case 'add':
                delete i.status
                state = [...state, i]
                break;
            case 'remove':
                delete i.status
                state.splice(state.findIndex(g => g.name === i.name), 1)
                state = [...state]
                break;
            case 'update':
                delete i.status
                state[state.findIndex(p => p.name === i.oldName)] = i
                delete i.oldPoolName
                state = [...state]
                break;
            default:
                console.log('default in switch');
                break;
        }
    });
    console.log(state);
    return state
}

const GenderContext = createContext();
export default GenderContext;