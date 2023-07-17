import React, { useState, useEffect} from "react"
import { Outlet } from "react-router-dom";
import { server } from "../../../services/axios"
import FormTeacher from "./FormTeacher";



const SendToFormTeacher = ({ name }) => {
    const [obj, setObj] = useState({})
    useEffect(() => {

        const findTeacher = async () => {
            const res = await server.get(`/teachers/findTeacher?name=${name}`)
            if (res.data[0])
                setObj(res.data[0])
            else
                name = ""
        }
        if (name) {
            findTeacher()
        }
    }, [])



    return <>
        {name ?
            <FormTeacher obj={obj} type="update"></FormTeacher>
            :
            <FormTeacher type="insert"></FormTeacher>
        }

        <Outlet></Outlet>
    </>

}

export default SendToFormTeacher

