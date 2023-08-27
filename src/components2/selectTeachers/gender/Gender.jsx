import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { server } from '../../../services/axios';

const useStyles = createUseStyles({
    td: {
        display:"inherit",
        margin: "15px",
        textAlign: "center",
        // border:"solid 5px #ededed", 
        height: "20px",
         width: "30px",
         padding:"10px",
         boxSizing:"border-box"
    }

})

const Gender = ({ text }) => {
    const css = useStyles()
    const [color, setColor] = useState("")


    useEffect(() => {
        // const getColorByName = async () => {

        //     const res = await server.post('/gender/find', { name: text, project: { _id: 0, genderColor: 1 } })
        //     setColor(res.data[0].genderColor)
        // }
        // getColorByName()

    }, [])


    // color: "white",
    return <>
        {
            color ?
                <td style={{ backgroundColor: color }} className={css.td}>
                    <span style={{  }}>{text}</span>
                </td>
                : ""
        }

    </>
}
export default Gender