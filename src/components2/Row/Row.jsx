import React from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import ValueComp from "../ValueComp/ValueComp";
import Icon from "../Icon/Icon";



const useStyles = createUseStyles({
    // border:{
    //     // display: 'flex',
    //     // flexDirection: 'row',
    //     // direction:'rtl',
    //     // padding:"5px",
    //     // margin:"5px"

    // }

})




const Row = ({ objRow }) => {
    const css = useStyles()
    const navigation = useNavigate()

    const specificTeacher = () => {
        navigation('/datamanager/teachers/oneTeacher', { state: { name: objRow['שם מטפל'].value } })
    }


    return <>
        <tr className={css.border} onClick={specificTeacher}>
            {
                Object.values(objRow).map((k, index) => (
                    k.type === "readonly" ?
                        <ValueComp text={k.value} color={k.color} backgroundColor={k.backgroundColor} fontWeight={k.fontWeight} key={index}  ></ValueComp> :
                        k.type === "icon" ?
                            k.value === true ?
                                <Icon obj={k} key={k.nameIcon}></Icon> :
                                <span ></span> :
                            <></>
                ))
            }
        </tr>
    </>
}

export default Row;
