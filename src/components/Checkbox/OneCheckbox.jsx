import { logDOM } from "@testing-library/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { ListContext, setbackgroundColor } from "./Checkbox";
import PoolTableContext from "../../context/PoolTable";

const useStyles = createUseStyles({
    out: {
        display: 'flex',
        direction: 'rtl',
    },
    span: {
        fontFamily: 'Calibri',
        fontSize: '23px'
    },
    wrapper: {
        margin: 10,
        cursor: 'pointer',
        width: 80,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStyle: 'solid',
        borderTopWidth: 5,
        fontWeight: 'bold',
        textAlign: 'center',

    },

})

const OneCheckbox = ({ obj }) => {
    const {object, setObject } = useContext(ListContext)
    const { data,setData } = useContext(PoolTableContext)

    const css = useStyles()
    const ref1 = useRef()

    const isChecked = () => {
        // console.log({obj});
        setObject({ obj, newStatus: !obj.checked })
        setData({ gender: obj.text })
    }
    // console.log({object});
    // console.log({data});

    if (obj.checked === true) {
        setbackgroundColor(obj)

    }



    return <>
        <div className={css.out}>
            {
                <div key={obj.text} ref={ref1} className={css.wrapper} id={obj.color} style={{ borderTopColor: obj.color, backgroundColor: obj.backgroundColor }} onClick={()=>isChecked()} >

                    <div className={`${obj.color}`}>
                        <span className={css.span}>{obj.text}</span>
                    </div>
                </div>
            }
        </div>
    </>
}
export default OneCheckbox;

