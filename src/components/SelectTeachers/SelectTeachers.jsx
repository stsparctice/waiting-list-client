import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { postData } from "../../services/axios";
import { stateStatus } from "../../store/storeStatus";
import { getAllTeachers } from "../../store/teachers";


const SelectTeachers = ({ pools, genders, onSelect }) => {
    const dispatch = useDispatch()
    const teachers = useSelector(state => state.Teachers.teachers)
    const teachersStatus = useSelector(state => state.Teachers.status)

    useEffect(() => {
        if (teachersStatus === stateStatus.EMPTY)
            dispatch(getAllTeachers())
    }, [dispatch, teachersStatus]);

    useEffect(() => {
        const findTeachers = async () => {
            const res = await postData('teachers/findTeacherByPoolAndGender', { condition: { swimmingPools: pools, genders:genders } })
            console.log({ res });
            
        }
        findTeachers()
    }, [dispatch, teachers]);

    const SelectTeacher = (val) => {
        onSelect(val)
    }


    return <>
        {
            teachers.length > 0 ? <>
                <div className="input-group">
                    <label>מטפלים</label>
                    <Select placeholder="בחר..."
                        options={teachers.map(t => ({ label: t.teacherName, value: t.id }))} onChange={SelectTeacher}>
                    </Select>
                </div>
            </> : ""
        }
    </>
}
export default SelectTeachers;

