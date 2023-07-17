import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import ValueComp from "../../components2/ValueComp/ValueComp";
import { server } from "../../services/axios";
// import Table from "../../components2/Table/Table";
import { useLocation, useNavigate } from "react-router-dom";

const useStyle = createUseStyles({
    div:{
        display: "flex"
    },
    table: {
        position: "absolute",
        zIndex: "1",
        textAlign: "center",
        marginTop:"25vh",
        marginRight:"35vw",
        border:"solid red 2px",
        padding:"5px",
        
    },
    button:{
        height:20,
    }
})

const SmallTable = () => {
    const css = useStyle()
    const details = useLocation().state
    console.log("details.details", details);
    const [color, setColor] = useState([])
    // const [small, setSmall] = useState()

    const nav = useNavigate()

    useEffect(() => {
        const findColor = async () => {
            let ans = await server.post(`/gender/find/`)
            ans.data = ans.data.map(col => (
                {
                    name: col.name,
                    genderColor: col.genderColor
                }
            ))
            console.log({ ans })
            setColor(ans.data)
        }
        findColor()
    }, [])

    const close = (event) => {
        event.stopPropagation();
        nav('/datamanager/teachers/list')
    }

    // console.log(small);
    return <>
        <div className={css.table}>
            <table>
                <thead>
                    <tr>
                        <th>יום</th>
                        <th>קבוצת טיפול</th>
                        <th>בריכה</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        details.map((item, index) => (

                            <tr key={index + 1}>
                                {
                                    Object.keys(item).map((i) => (
                                        i === 'group' ?
                                            Object.values(color).map((c, indexi) => (
                                                c.name === item[i] ?
                                                    <ValueComp key={`x${indexi}`} text={c.name} backgroundColor={c.genderColor}></ValueComp> :
                                                    <></>
                                            )) :
                                            <ValueComp key={`y${i}`} text={item[i]}></ValueComp>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={close} className={css.button}>סגור</button>
        </div>
    </>
}

export default SmallTable
