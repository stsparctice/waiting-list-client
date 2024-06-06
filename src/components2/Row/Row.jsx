import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Readonly from "../Readonly/Readonly";
import Icon from "../Icon/Icon";
import { hover } from "@testing-library/user-event/dist/hover";
import Gender from "../selectTeachers/gender/Gender";



const useStyles = createUseStyles({
    back: {
        backgroundColor: 'orange',
        opacity: '0.6',
        cursor: 'pointer'
    },
    // border:{
    //     // display: 'flex',
    //     // flexDirection: 'row',
    //     // direction:'rtl',
    //     // padding:"5px",
    //       // margin:"5px"
    // },
    row: {
        borderBottom: "orange 1px solid",
        alignItems: "center",
        // marginTop:"3px"
    }

})

const Row = ({ objRow }) => {
    const css = useStyles()

    const mouseOver = (event) => {
        event.target.parentNode.classList.add(css.back)
    }

    const mouseLeave = (event) => {
        event.target.parentNode.classList.remove(css.back)
    }

    return <>

        {
            // Object.values(objRow).map(i => (
            //     i['over'] ?
            //         i['over'] == true ?
            //             mouseOver() :
        }

        {
            // Object.values(objRow).map(i => (
            // i.over == true ?
            //     <tr onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
            //         {
            //             Object.values(objRow).map(ke =>
            //             (ke.type == "readonly" ?
            //                 <Readonly text={ke.value} color={ke.color} backgroundColor={ke.backgroundColor} fontWeight={ke.fontWeight} key={ke.value} ></Readonly> :
            //                 ke.type == "icon" ? ke.value == true ? <Icon obj={ke} key={ke.nameIcon}></Icon> : <span key={ke.nameIcon}  ></span> : )
            //             )
            //         }
            //     </tr> 
            // ))
            // onMouseOver={mouseOver} onMouseLeave={mouseLeave}
            <tr className={css.row}>
                {
                    // (k.nameIcon = "exclamationMark", <Icon obj={k} key={'exclamationMark'}></Icon>)
                    Object.values(objRow).map(k =>
                    (
                        objRow["רמת דחיפות"].value === "גבוהה" && k.value === "" ? <Icon obj={k} key={k.nameIcon}></Icon> :
                            k.type === "readonly" ?
                                <Readonly text={k.value} color={k.color} backgroundColor={k.backgroundColor} fontWeight={k.fontWeight} key={k.value} ></Readonly>
                                //    k.nameIcon && k.value === "גבוהה" ?<Icon obj={k} key={k.nameIcon}></Icon>
                                : k.type === "gender" ? <Gender key={k.value} text={k.value}></Gender> :
                                    k.type === "icon" ? k.value === true ? <Icon obj={k} key={k.nameIcon}></Icon> : <span key={k.nameIcon}  ></span> : <></>)
                    )

                }
            </tr>
        }
    </>
}


export default Row;
