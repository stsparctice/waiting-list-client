import { createContext } from 'react'

export const HoursDetailsReducer = (state, item) => {
    switch (item.option) {
        case 'add':
            delete item.option;
           if(!state.find(s=>(s.day===item.day&&s.start===item.start&&s.end===item.end))){
            state = [...state, item];
           };
            break;
        case 'remove':
            state.splice(state.findIndex(i=>(i.day===item.day&&i.start===item.start&&i.end===item.end)),1);
            state=[...state]
            break;
        default:
            break;

    }
    console.log(state);
    return state

}
const HoursDetailContext = createContext()
export default HoursDetailContext 