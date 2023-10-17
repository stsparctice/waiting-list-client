import React, { useState, useEffect, useReducer } from "react";
import { createUseStyles } from "react-jss";
import Option from "../option/Option";
import { server } from "../../../services/axios"
import "./hover.css"

const useStyles = createUseStyles({

    dropHeader: {
        display: "block",
        padding: "15px 4px"
    },
    dropContainer: {
        position: "relative",
        cursor: "pointer",

    },
    dropContent: {
        textDecoration: 'none',
        display: "none",
        position: "absolute",
        height: '100px',
        overflow: "auto",

        '& ul': {
            padding: "0",
            listStyleType: "none",
            margin: "0"
        },
    },
    option: {
        marginBottom: "10px"
    }







})
const OptionGroup = ({ pools, genders, click }) => {
    const css = useStyles()
    const [teachers, setTeachers] = useState([])
    let filter = []

    useEffect(() => {
        const selectTeachers = async () => {
            pools.forEach(p => (
                genders.forEach(g => (
                    filter.push({ pools: p, genders: g })
                ))

            ));
            let data=await server.get('teachers/findAllTeachers')
            //  = await server.post('teachers/findTeacherByCondition', { filter })
            setTeachers(data.data)
        }
        selectTeachers()
        // 0533182179
    }, [])
    const showList = () => {
        console.log('show listtttttttttttttttt');
        document.querySelector('#content').style.display = 'block'
    }
    // const selectTeach = async() = {
    //     let fullData=await server.get('teachers/findAllTeachers')
    // }
    return <>
        {
            <div className={css.dropContainer} >
                {/* <input type="button" className={css.dropHeader} value="מטפלים מועדפים" onMouseDown={showList}/> */}
                <span className={css.dropHeader} onClick={showList}>מטפלים מועדפים:</span>
                <div className={css.dropContent} id="content">
                    <ul >
                        {
                            teachers.length > 0 ?

                                teachers.map((teacher, index) => (
                                    <li key={index} className={css.option} onClick={(() => click(teacher.name, teacher.genders))}> <Option key={index} name={teacher.name} genders={teacher.genders} ></Option></li>
                                ))
                                : ""}
                    </ul>

                </div>
            </div>
        }

    </>


}
export default OptionGroup