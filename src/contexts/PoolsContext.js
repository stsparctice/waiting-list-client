import { createContext } from "react";

export const updatePool = (state, item) => {
    item.forEach(i => {
        switch (i.status) {
            case 'add':
                console.log('in add++++++++++++++');
                delete i.status
                state = [...state, i]
                break;
            case 'remove':
                console.log('===============');
                delete i.status
                console.log('index',state.findIndex(p => p.poolName === i.poolName));
                console.log('state',state);
                state.splice(state.findIndex(p => p.poolName === i.poolName), 1)
                state = [...state]
                break;
            case 'update':
                delete i.status
                let index=state.findIndex(p=>p.poolName===i.oldPoolName)
                state[index]=i
                state=[...state]
                delete i.oldPoolName
                break;
            default:
                console.log('default in switch');
                break;
        }
    });
    return state
}

const PoolContext = createContext();
export default PoolContext;