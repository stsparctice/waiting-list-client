import { createContext } from 'react'

export const activeHoursReducer = (state, item) => {
    switch (item.option) {
        case 'add':
            delete item.option;
            state = [...state, item];
            break;
        case 'remove':
            state.splice(state.findIndex(i => i.day === item.day),1);
            state = [...state];
            console.log("state");
            console.log(state);
            break;

    }
    return state

}
const ActiveHoursContext = createContext()
export default ActiveHoursContext 