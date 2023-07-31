import React, { useState, useEffect, useReducer } from "react";
import { createUseStyles } from "react-jss";
import { server } from "../../services/axios";


const SelectTeacher = ({ arrgander, arrPool } = []) => {
const select =(teacher)=>{
console.log(teacher);
console.log("teacher");

   }


    const setList = (list, ans) => {
        // console.log(ans);
        // console.log("ans");


        list = [...list, ans]
        return list
    }

    const [listTeachers, setListTeachers] = useReducer(setList, [])


    useEffect(() => {


        const findTeacher = async () => {

            await arrPool.map(async (p) => {
                await arrgander.map(async (m) => {
                    let ans = await server.post('teachers/findTeacher', { name: m, phone: p })
                    if (ans.data[0]) {
                        console.log(ans.data[0].name);
                        await setListTeachers(ans.data[0].name)
                    }
                })
            })

        }

        findTeacher()
    }, [])
    return <>
        {console.log(listTeachers)}

 
        {
           
            listTeachers.map((m, index) => (
                <h2 key={index} onClick={select(m)}>{m} </h2>
            ))
        }

    </>


}

export default SelectTeacher;