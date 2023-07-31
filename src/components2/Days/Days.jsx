import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { server } from "../../services/axios";

const useStyles = createUseStyles({

})

const Days = ({ poolArray, genderArray }) => {
    const [arr, setArr] = useState([])

    useEffect(() => {
        const getDataFromSerevr = async () => {
            await Promise.all([findPools].map(func => func()))
        }

        const findPools = async () => {
            const ans = await server.post('/pool/find', { filter: { poolName: { $in: poolArray } }, project: { _id: 0, poolName: 1, poolColor: 1, schedule: 1 } })
            if (ans.data.length > 0) {
                ans.data.map(p => ({
                    poolName: p.poolName, schedule: p.schedule.map((day) => ({ day: day.day, hours: day.hours.filter(h => genderArray.includes(h.gender)) })).filter(d => d.hours.length > 0)
                }))
                setArr(ans.data)
            }
            console.log(arr);
        }
        getDataFromSerevr()
    }, [])

    const css = useStyles()

    // <select name={p.poolName} key={p.poolName}> </select>
    return <>

        {
            arr.length > 0 ? <>
                {
                    <select name="" id="">
                        {arr.map(p => p.map(m => (<option value={m.day}>{m.day}</option>)))}
                    </select>
                    // arr.map(m => (
                    //     <option key={m.day} value={m.day}>{m.day}</option>
                    // ))
                }
            </> : ""
        }
        {/* {
            arr.length>0 ? <>{
                
                arr.map(p => (
                    <select name={p.poolName} key={p.poolName}>{p.poolName}</select>))
                    .map(m => (<option key={m.day} value={m.day}>{m.day}</option>))
                // arr.map(m => (
                //     <option key={m.day} value={m.day}>{m.day}</option>
                // ))
            }
            </> : ""
        } */}

    </>
}
export default Days;

