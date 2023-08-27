import React, { lazy, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import add from "../../assets/add.png";
import excel from "../../assets/excel.png";
import find from "../../assets/find.png";
import stethoscope from "../../assets/stethoscope.png";
import telephone from "../../assets/telephone.png";
import deleteImg from "../../assets/delete3.png"
import edit from "../../assets/edit3.png"

const useStyles = createUseStyles({

    btn: {
        display:'inline-block',
        padding:0,
        backgroundColor: 'transparent',
        cursor: "pointer",
        background:'none',
        border:'none',
        width:'100%',
        '&:hover':{
            backgroundColor:'pink'
        }
      
    }

})

const images = {
    'add': add,
    'excel': excel,
    'find': find,
    'stethoscope': stethoscope,
    'telephone': telephone,
    deleteImg:deleteImg, edit:edit
}


const ButtonIcon = ({ imgName, func }) => {
    const [imageSrc, setImageSrc] = useState()
    const css = useStyles()
    useEffect(() => {
        setImageSrc(images[imgName])
    }, [imgName])

    return <>
        <button className={css.btn} >
            <img src={imageSrc } width={18} onClick={func} alt="" />
        </button>

    </>
}
export default ButtonIcon;