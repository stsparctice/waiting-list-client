import React, { useReducer, useCallback } from "react";
import OptionGroup from "../optionGroup/OptionGroup";

const Select = ({genders,pools}) => {

    const addteacher = (state, action) => {
        if (action.type === 'add')
            state = [...state, action.value]
        return state
    }

    const [selectedTeachers, setSelectedTeachers] = useReducer(addteacher, [])

    const toAddTeacher = useCallback(async (name, genders) => {
        console.log(name, "---------------------", genders);

        setSelectedTeachers({ type: 'add', value: name })
    }, [])


    return <>
        {
            <OptionGroup pools={pools} genders={genders} click={toAddTeacher}></OptionGroup>
        }
        {
            selectedTeachers.length>0 ?
            <>{
                selectedTeachers.map((m,index)=>(
                 <h1 key={index}>{m}</h1> 
                ))

            }
            </>
                : ""
        }
    </>
}
export default Select