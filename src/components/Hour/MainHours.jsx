import React, { useEffect, useContext, useState, useRef, useCallback } from "react";
import { getData, postData } from "../../services/axios";
import { createUseStyles } from "react-jss";
import HoursContext from "../../context/Hours";
// import DetailsContext from "../../../../contexts/DetailsContext";
import ActiveHoursRef from "../../context/ActiveHoursRef"
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

        const ifExclamationMarkBool = (async (day) => {
            console.log("in ifExclamationMarkBool");
            let d = await getDetails(day)
            console.log(d);
            let j = 1
            let bool
            if (d.length > 1) {
                for (let i in d) {
                    for (j in d) {
                        if (d[i].endHour < d[j].startHour) {
                            bool = true
                            setFlagExclamationMarkBool(bool)
                            return true
                        }
                    }
                }
            }
            bool = false

            setFlagExclamationMarkBool(bool)
            return false
        })


        allcards()
        const set = (() => {
            try {
                setActiveHours(activeHours.map(a => {
                    a.exclamationMarkBool = ifExclamationMarkBool(a.day)
                }))
            }
            catch {
                console.log('error');
            }
        })
        set()
    }, []);
    // const openDetailsHours = useCallback(async(day) => {
    //     if (divRef.current.style.display == 'block') {
    //         divRef.current.style.display = 'none'
    //         return;
    //     }
    //     divRef.current.style.display = 'block'
    //     let d = await getData(`/schedule/getAllActiveHoursByDay?poolName=ashdod&day=${day}`)
    //     d = d[0].schedule[0].activeHours
    //     setDetails(d)
    //     console.log(day);
    //     console.log(details);
    // },[])    


    const openDetailsHours = useCallback(async (day, ref) => {
        console.log('in openDetailsHours');
        if (ref.current.style.display === 'block') {
            console.log('block');
            ref.current.style.display = 'none'
            return [];
        }
        console.log('none');
        ref.current.style.display = 'block'
        return getDetails(day)
    }, [])

    const funcDelete = useCallback(async (day) => {
        let d = await postData('schedule/deleteHourByDay', { poolName: poolName, day: day, gender: gender })
        setActiveHours({ day: day, option: 'remove' })
    }, [])

    const getDetails = useCallback(async (day) => {
        let detail = await postData(`/schedule/getAllHoursByDay?poolName=${poolName}&day=${day}`)
        let ndetail = [];
        detail.forEach((h, place) => {
            if (h.gender == gender) {
                ndetail.push(...detail.slice(place, place + 1))
            }
        })
        return ndetail
    }, [])

    const getActiveDetails = useCallback(async (day) => {
        let d = await getData(`/schedule/getAllActiveHoursByDay?poolName=${poolName}&day=${day}`)
        console.log(d)
        setDetails(d.activeHours)
        return d
    },[])

    const ifExclamationMarkBool = (async (day) => {
        console.log("in ifExclamationMarkBool");
        let d = await getActiveDetails(day)
        console.log(d);
        let j = 1
        let bool
        if (d.length > 1) {
            for (let i in d) {
                for (j in d) {
                    if (d[i].endHour < d[j].startHour) {
                        bool = true
                        // setFlagExclamationMarkBool(bool)
                        return bool
                    }
                }
            }
        }
        bool = false
        // setFlagExclamationMarkBool(bool)
        return bool
    })

    const func = (async (day) => {
        console.log("in func");
        return await ifExclamationMarkBool(day)
    })

    return <>

        <ActiveHoursRef.Provider value={{ activeHoursRef, setActiveHoursRef }}>
            {
                activeHours.map((r) =>
                    <RowOfHour
                        key={r.day}
                        day={r.day}
                        stratHour={r.startHour}
                        endHour={r.endHour}
                        //  exclamationMarkBool={true}
                        exclamationMarkBool={ans = func(r.day)}
                        
                        backgroundColor={r.color}
                        funcDetails={openDetailsHours}
                        funcDelete={funcDelete}
                        ></RowOfHour>
                        )
                    }
                    {console.log(ans)}

        </ActiveHoursRef.Provider>

    </>
}

export default MainHours;