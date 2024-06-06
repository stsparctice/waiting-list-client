import React, { useEffect, useState } from "react";
import Select from "react-select";
import { postData } from "../../services/axios";
import SelectDays from '../SelectDays/SelectDays'

const SelectTeachers = ({ pools, genders, onSelect, selectDays }) => {

    const [teachers, setTeachers] = useState([])
    const [days, setDays] = useState([])

    useEffect(() => {
        const getDataFromSerevr = async () => {
            await Promise.all([findTeachers].map(func => func()))
        }
        const findTeachers = async () => {
            const poolsId = pools.map(p => ({ poolId: p.id }))
            const gendersId = genders.map(g => ({ genderId: g.id }))
            const res = await postData('teachers/findTeacherByPoolAndGender', { poolId: pools[0].item.id, genderId: genders[0].id })
            setTeachers(res.data)
        }
        getDataFromSerevr()
    }, []);

    const SelectTeacher = async (val) => {
        onSelect(val)
        const res = await postData('teachers/findGendersAndDaysByTeachers', { id: val.value })
        setDays(res.data)
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
        {
            days.length > 0 ? <>
                <div className="input-group">
                    <label>ימים</label>
                    <SelectDays days={days} onSelect={selectDays}></SelectDays>
                </div>
            </> : ""
        }
    </>
}
export default SelectTeachers;

