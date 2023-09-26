import { createContext,  useState } from 'react';


export const ScheduleTableContext = createContext();

const ScheduleTableProvider = ({ children }) => {
    const [scheduleHours, setScheduleHours] = useState([]);
   
    return <>
        <ScheduleTableContext.Provider value={{ scheduleHours, setScheduleHours }}>
            {children}
        </ScheduleTableContext.Provider>
    </>
}


export default ScheduleTableProvider