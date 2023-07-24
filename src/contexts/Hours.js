import { createContext } from 'react'

export const HoursReducer = (state, item) => {
    console.log(state,'state');
    switch (item.option) {
        case 'add':
            delete item.option;
            state = [...state, item];
            break;
        case 'remove':
            state.splice(state.findIndex(i => i.day === item.day), 1);
            state = [...state];
            break;
      
        default:
            break;

    }
    return state

}
const HoursContext = createContext()
export default HoursContext 