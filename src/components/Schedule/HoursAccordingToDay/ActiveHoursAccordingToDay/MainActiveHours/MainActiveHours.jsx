import React, {  useEffect,  useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
// import ShowHours from "../AcorShowActiveHours/AcorShowActiveHours";
import AcorInsertActiveHour from "../PoolGenderHourForm/PoolGenderHourForm";
// import '../../../../OpenModalStyle.css'
import AcorActiveHourContext from "../AcorActiveHourContext";
import AcorShowActiveHours from "../AcorShowActiveHours/AcorShowActiveHours";

import { getAllSchedules, setSelectedPool } from '../../../../../store/schedule'
import TextButton from "../../../../../basic-components/TextButton/TextButton";
import WeekSchedule from "../../../ScheduleTable/WeekSchedule";
import PoolGenderHourForm from '../PoolGenderHourForm/PoolGenderHourForm'
import ScheduleTableProvider from "../../../ScheduleTable/ScheduleTableContext";



const MainActiveHours = ({ day }) => {
    const { poolId } = useParams()
    console.log({poolId})
    const dispatch = useDispatch()
    const poolSchedules = useSelector(state => state.Schedule.allSchedules)
    const [insert, setInsert] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedDay, setSelectedDay] = useState(undefined)
    useEffect(() => {
        console.log({ poolId })
        dispatch(getAllSchedules(poolId))

    }, [poolId, dispatch])

    useEffect(()=>{
console.log('useEffect poolschedules')
    }, [poolSchedules])

    const openModal = () => {
        setInsert(true)
        setShowModal(true)
        // setSelectedPool(0)
    }

    const closeModal = () => {
        setShowModal(false)
        // setShowDeleteModal(false)
    }

    const openInsertModal = (day) => {
        setSelectedDay(day)
        openModal()
    }

    const openEditModal = (day) => {
        openModal()
    }

    return <>

        {/* <div>
        <TextButton bgColor={'purple'} text="הוספת יום למערכת"></TextButton>
       </div> */}
        <ScheduleTableProvider>
            <WeekSchedule schedule={poolSchedules} insertEvent={openInsertModal} editEvent={openEditModal}></WeekSchedule>
        </ScheduleTableProvider>


        {showModal ?
            <PoolGenderHourForm day={selectedDay} cancel={closeModal} ></PoolGenderHourForm> : <></>}
    </>
}

export default MainActiveHours;