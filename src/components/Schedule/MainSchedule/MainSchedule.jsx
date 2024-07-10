import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import '../../../styles/Form.css';
import { createUseStyles } from "react-jss";

import { setSelectedPool, getAllSchedules } from '../../../store/schedule'
import { getAllPools } from '../../../store/swimmingPools'
import { stateStatus } from "../../../store/storeStatus";

import SelectSwimmingPool from "../../SelectSwimmingPool/SelectSwimmingPool";
import TextButton from "../../../basic-components/TextButton/TextButton";
import { Outlet, useNavigate } from "react-router-dom";

const useStyle = createUseStyles({
    scheduleHeader: {
        marginTop:4,
        alignItems:'center',
        display: 'flex',
        justifyContent: 'space-between',
        borderWidth:[5,0 ],
        borderStyle:'solid',
        '& h2':{
            paddingRight:10,
            margin:2
        }

    },
    buttonsRow:{
        display:'flex',
        alignItems:'center'
    }
})


const MainSchedule = () => {
    const css = useStyle()
    const dispatch = useDispatch()
    const nav = useNavigate()
    const selectedPool = useSelector(state => state.Schedule.selectedPool)
    const pools = useSelector(state => state.SwimmingPools.pools)
    const poolsStatus = useSelector(state => state.SwimmingPools.status)
    useEffect(() => {
        if (poolsStatus === stateStatus.EMPTY)
            dispatch(getAllPools())
    }, [poolsStatus, dispatch])


    const selectPool = (value) => {
        const pool = pools.find(p => p.id === value.value)
        dispatch(setSelectedPool(pool))
        dispatch(getAllSchedules(pool.id))
    }

    const navigateToDays = () => {
        if (selectedPool) {
            nav(`/datamanager/schedule/dayschedule/${selectedPool.id}`)
        }
    }

    // const sortSchedule = (data) => {
    //     data.forEach(day => {
    //         if (day.activeHours) {
    //             let minHour = day.activeHours[0].startActiveHour
    //             let maxHour = day.activeHours[0].endActiveHour
    //             if (day.activeHours.length > 0) {
    //                 for (let hours of day.activeHours) {
    //                     if (hours.startActiveHour < minHour)
    //                         minHour = hours.startActiveHour
    //                     if (hours.endActiveHour > maxHour)
    //                         maxHour = hours.endActiveHour
    //                 }
    //             }
    //             // setActiveHours({ day: day.day, startActiveHour: minHour, endActiveHour: maxHour, option: 'add' })
    //         }
    //     });
    // }

    return <>
        <h1>שעות פעילות</h1>
        <div >
            <div className="input-group" >
                <label>בריכה</label>
                <SelectSwimmingPool onSelect={selectPool}  />
            </div>

        </div>
        {selectedPool.id ?
            <div >
                <div className={css.scheduleHeader} style={{borderColor:selectedPool.color}}>
                    <div>
                        <h2>{selectedPool.name}</h2>
                    </div>
                    <div className={css.buttonsRow}>
                        <TextButton text={"ימי פעילות"} func={navigateToDays} bgColor={selectedPool.color}></TextButton>
                        <TextButton text={"מטפלים"} bgColor={selectedPool.color}></TextButton>
                    </div>
                </div>
                <Outlet />
            </div>
        :<></>}

    </>
}

export default MainSchedule;