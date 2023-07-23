import React, { useEffect, useContext, useState, useRef, useCallback } from "react";
import { getData, postData } from "../../services/axios";
import { createUseStyles } from "react-jss";
import HoursContext from "../../contexts/Hours";
// import DetailsContext from "../../../../contexts/DetailsContext";
import ActiveHoursRef from "../../contexts/ActiveHoursRef"
// import '../../../OpenModalStyle.css'
import RowOfHour from './RowOfHour'

const useStyles = createUseStyles({

    table: {
        userSelect: 'none',
        marginLeft: '15%',
        width: '70%',
        textAlign: 'center',
        direction: 'rtl',
        border: '1px solid black'
    },

    caption: {
        borderTop: '1px solid black',
        borderRight: '1px solid black',
        borderLeft: '1px solid black',


    },
    th: {
        width: '20%',
        border: '1px solid black'
    },
    th2: {
        width: '1%'
    },
    // th3: {
    //     width: '54%',
    //     border: '1px solid black'
    // }

})
const MainHours = ({ times, color, poolName, gender }) => {
    const css = useStyles();
    const refModal = useRef()
    const refMainComponent = useRef()
    const [activeHoursRef, setActiveHoursRef] = useState({})
    const { activeHours, setActiveHours } = useContext(HoursContext)
    const [flagExclamationMarkBool, setFlagExclamationMarkBool] = useState(false)
    const [details, setDetails] = useState([])
    let ans

    // const divRef = useRef()

    useEffect(() => {
        const allcards = async () => {

            //בבקשה זו צריך להשלח שם הבריכה
            let response = await postData(`/schedule/getAllHoursByGender/?poolName=${poolName}&gender=${gender}`)

            // response = response[0].schedule
            for (let day of times) {
                if (day.hours) {
                    let minHour = day.hours[0].startHour
                    let maxHour = day.hours[0].endHour
                    if (day.hours.length > 0) {
                        for (let hour of day.hours) {
                            if (hour.startHour < minHour)
                                minHour = hour.startHour
                            if (hour.endHour > maxHour)
                                maxHour = hour.endHour
                        }
                    }
                    setActiveHours({ day: day.day, startHour: minHour, endHour: maxHour, color: color, option: 'add' })
                }
            }
        }



        allcards()
       
    }, []);



    const openDetailsHours = useCallback(async (day, ref, type) => {
        if (ref.current.style.display === 'block') {
            ref.current.style.display = 'none'
            return [];
        }
        ref.current.style.display = 'block'
        return getDetails(day, type)
    }, [])

    const funcDelete = useCallback(async (day) => {
        let d = await postData('schedule/deleteHourByDay', { poolName: poolName, day: day, gender: gender })
        setActiveHours({ day: day, option: 'remove' })
    }, [])



    const getDetails = useCallback(async (day, type ) => {
        let detail
        let ndetail = [];
        switch (type) {
            case 'hour': {
                detail = await postData(`/schedule/getAllHoursByDay?poolName=${poolName}&day=${day}`)
                detail.forEach((h, place) => {
                    if (h.gender == gender) {
                        ndetail.push(...detail.slice(place, place + 1))
                    }
                })
            }
                break;
            case 'notInActiveHours': {
                detail = await postData(`/schedule/getAllActiveHoursByDay?poolName=${poolName}&day=${day}`)
                detail=detail.activeHours;
                let j = 1
                for (let i in detail) {
                    for (j in detail) {
                        if (detail[i].endActiveHour < detail[j].startActiveHour) {
                            ndetail.push({ 'StartNotInActiveHour': detail[i].endActiveHour, 'endNotInActiveHour': detail[j].startActiveHour })
                        }
                    }
                }

            }
                break;
            case 'activeHours': {
                detail = await postData(`/schedule/getAllActiveHoursByDay?poolName=${poolName}&day=${day}`)
                ndetail= detail.activeHours
            }
                break;
            default: { }
                break;
        }
        return ndetail;
    }, [])
    

    return <>

        <ActiveHoursRef.Provider value={{ activeHoursRef, setActiveHoursRef }}>

            {

                activeHours.map((r) =>
                    <RowOfHour
                        key={r.day}
                        day={r.day}
                        stratHour={r.startHour}
                        endHour={r.endHour}
                        poolName={poolName}
                        // exclamationMarkBool={flagExclamationMarkBool}
                        backgroundColor={r.color}
                        funcDetails={openDetailsHours}
                        funcDelete={funcDelete}
                    ></RowOfHour>
                )
            }
        </ActiveHoursRef.Provider>

    </>
}

export default MainHours;