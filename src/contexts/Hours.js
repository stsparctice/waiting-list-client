import { createContext } from 'react'

export const HoursReducer = (state, item) => {
    switch (item.option) {
        case 'add':
            delete item.option;
            state = [...state, item];
            break;
        case 'remove':
            state.splice(state.findIndex(i => i.day === item.day), 1);
            state = [...state];
            console.log("state");
            console.log(state);
            break;
        default:
            break;

    }
    return state

}
const HoursContext = createContext()
export default HoursContext 