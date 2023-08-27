import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useContext, useEffect, useReducer, useState,useCallback } from "react";
import PoolTableContext, { PoolTable } from "../../contexts/PoolTable";
import { getData } from "../../services/axios";
import MainHours from "../Hour/MainHours"

const PoolTableInformation = () => {
    const [detail, setDetail] = useState([])
    const [flag,setFlag]=useState()
    const {data} = useContext(PoolTableContext)
  
    let newdata = []
  

    const check = useCallback(() => {
        setFlag(!flag)    
    },[])


    useEffect(() => {
        try {
            data.pool.schedule.forEach(d => {
                d.hours.forEach((h,place) => {
                    if (h.gender === data.gender) { 
                        let isExist=false;
                        newdata.map(m => {
                            if (m.day === d.day) {
                                isExist=true
                                m.hours = [...m.hours, ...d.hours.slice(place,place+1)]
                            }
                        })
                        if(!isExist)
                            newdata.push({ day: d.day, hours: [{ startHour: h.startHour, endHour: h.endHour }] })

                    }
                })
            })
        }
        catch {
            console.log('data.pool.schedule unrecognized');
        }
        setDetail(newdata)

    }, [flag])

    return <>
        <button onClick={check}>try</button>
        {
            detail.length>0?<MainHours times={detail} color={data.pool.poolColor} poolName={data.pool.poolName} gender={data.gender}/>:<></>
        }
    </>
}
export default PoolTableInformation