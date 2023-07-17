import React, { startTransition, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AcorMainActiveHours from "../ActiveHoursAccordingToDay/AcorMainActiveHours/AcorMainActiveHours";
import MainHours from "../HoursAccordingToGender/MainHours/MainHours";
import HoursAccordingToDayContext from "../HoursAccordingToDayContext"

const MainHoursAccordingToDay = () => {
    const params = useParams()
    const [info,setInfo]=useState({})
    useEffect(() => {
        function start(){
            setInfo({poolName:params.poolName,day:params.day})
      }
    start()
      
    }, [])
    
    // const poolName = params.poolName
    // const day = params.day
    return <>
        <HoursAccordingToDayContext.Provider value={{info,setInfo}}>
            <p>schedule to {info.day}</p>
            <p>{info.poolName}</p>
            <AcorMainActiveHours key={`activeHour${info.poolName}`} poolName={info.poolName} day={info.day} />
            <MainHours key={`hour${info.poolName}`} poolName={info.poolName} day={info.day} />
        </HoursAccordingToDayContext.Provider>
    </>
}

export default MainHoursAccordingToDay