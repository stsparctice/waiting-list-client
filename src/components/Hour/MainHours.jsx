import React, { useEffect, useContext, useState, useRef, useCallback } from "react";
import { getData, postData } from "../../services/axios";
import { createUseStyles } from "react-jss";
import HoursContext from "../../contexts/Hours";
// import DetailsContext from "../../../../contexts/DetailsContext";
import ActiveHoursRef from "../../contexts/ActiveHoursRef"
// import '../../../OpenModalStyle.css'
import RowOfHour from './RowOfHour'
import HoursDetailContext from '../../contexts/HoursDetails'
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
    input: {
        color: "aqua",
        backgroundColor: "pink"
    }
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
    const { details, setDetails } = useContext(HoursDetailContext)
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
    const editDetails = useCallback(async (day, stratHour, endHour, newStart, newEnd) => {
        console.log({ day: day, start: stratHour, end: endHour, newStart: newStart, newEnd: newEnd });
        if (newEnd != undefined && newStart != undefined) {
            await postData('schedule/deleteHourByDay', { poolName: poolName, day: day, gender: gender, startHour: stratHour, endHour: endHour })
            await postData('schedule/addHourByDay', { poolName: poolName, day: day, gender: gender, startHour: newStart, endHour: newEnd })
        }
        else{
            newEnd=endHour;
            newStart=stratHour;
        }
        setDetails({ day: day, start: stratHour, end: endHour, option: 'remove' })
        setDetails({ day: day, start: newStart, end: newEnd, type: 'hour', gender: gender, option: 'add' })
    }, [])


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

    const funcDeleHour = useCallback(async (day, start, end) => {
        let dele = await postData('schedule/deleteHourByDay', { poolName: poolName, day: day, gender: gender, startHour: start, endHour: end })
        setDetails({ day: day, start: start, end: end, option: 'remove' })
    }, [])

    const getDetails = useCallback(async (day, type) => {
        let detail
        switch (type) {
            case 'hour': {
                detail = await postData(`/schedule/getAllHoursByDay?poolName=${poolName}&day=${day}`)
                detail.forEach((h, place) => {
                    if (h.gender == gender) {
                        let d = detail.slice(place, place + 1)
                        setDetails({ start: d[0].startHour, end: d[0].endHour, gender: d[0].gender, day: day, option: 'add', type: 'hour' })
                    }
                })
            }
                break;
            case 'notInActiveHours': {
                detail = await postData(`/schedule/getAllActiveHoursByDay?poolName=${poolName}&day=${day}`)
                detail = detail.activeHours;
                let j = 1
                for (let i in detail) {
                    for (j in detail) {
                        if (detail[i].endActiveHour < detail[j].startActiveHour) {
                            setDetails({ start: detail[i].endActiveHour, end: detail[j].startActiveHour, day: day, option: 'add', type: 'notInActiveHours' })
                        }
                    }
                }

            }
                break;
            case 'activeHours': {
                detail = await postData(`/schedule/getAllActiveHoursByDay?poolName=${poolName}&day=${day}`)
                setDetails({ start: detail.activeHours.startActiveHour, end: detail.activeHours.endActiveHour, day: day, option: 'add', type: 'activeHours' })
            }
                break;
            default: { }
                break;
        }
        return type;
    }, [])
    // { setFlagInput(false) }


    // <div> {flagInput?<NewInput text={'start'} /> : ''} </div>
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
                        backgroundColor={r.color}
                        // flagInput={flagInput}
                        funcDetails={openDetailsHours}
                        funcDelete={funcDelete}
                        funcDeleHour={funcDeleHour}
                        editDetails={editDetails}
                    ></RowOfHour>
                )
            }
        </ActiveHoursRef.Provider>

    </>
}

export default MainHours;