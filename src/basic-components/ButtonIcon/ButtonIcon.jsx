import React, { lazy, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import add from "../../assets/add.png";
import excel from "../../assets/excel.png";
import find from "../../assets/find.png";
import stethoscope from "../../assets/stethoscope.png";
import telephone from "../../assets/telephone.png";

const useStyles = createUseStyles({

    img: {
        padding: 0,
        margin: 0,
        border: 0,
        cursor: "pointer",
    }

})

const images = {
    'add': add,
    'excel': excel,
    'find': find,
    'stethoscope': stethoscope,
    'telephone': telephone
}


const ButtonIcon = ({ imgName, func }) => {
    console.log('imgNAme',imgName);
    const css = useStyles()
    const srcRef = useRef()
    useEffect(() => {
        srcRef.current.setAttribute('src', images[imgName])
    }, [])

    return <>
        <button className={css.img} >
            <img ref={srcRef} onClick={func} />
            {/* <img ref={srcRef} style={{ width: '36px', height: '36px' }} onClick={func} /> */}
        </button>

    </>
}
export default ButtonIcon;