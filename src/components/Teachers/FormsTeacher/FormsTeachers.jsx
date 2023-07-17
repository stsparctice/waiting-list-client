import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import SendToFormTeacher from "../FormTeacher/SendToFormTeacher"

const FormsTeachers = () => {
    const { state } = useLocation();
    const { name } = state || {};
    
    return <>
        {
            (name != undefined) ?
                <h3>מטפל קיים</h3> :
                <h3>מטפל חדש</h3>
        }
        <SendToFormTeacher name={name}></SendToFormTeacher>
      
     
    </>
}

export default FormsTeachers









