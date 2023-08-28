import React, { lazy, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import add from "../../assets/add.png";
import excel from "../../assets/excel.png";
import find from "../../assets/find.png";
import stethoscope from "../../assets/stethoscope.png";
import telephone from "../../assets/telephone.png";
import deleteImg from "../../assets/delete-white.png"
import edit from "../../assets/edit-white.png"

const useStyles = createUseStyles({

    btn: (props) => ({
        cursor: "pointer",
        padding: [7, 15],

        background: 'none',
        height: props.height,
        width: props.width,
        borderRadius: 7,
        border: 'none',
        backgroundColor: props.backgroundColor,
        transitionDuration: '0.3s',
        transitionProperty: 'all',
        transitionTimingFunction: 'linear',
        '&:hover': {
            borderRadius: 20
        },

        '& figure': {
            padding: 0,
            margin: 0,
            height:'100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '& img': {
            objectFit:'contain',
            height:props.imageSize.height,
            width:props.imageSize.width
        }

    })


})

const images = {
    'add': add,
    'excel': excel,
    'find': find,
    'stethoscope': stethoscope,
    'telephone': telephone,
    deleteImg: deleteImg, edit: edit
}


const ButtonIcon = ({ imgName, title, func, ...props }) => {
    console.log({ props })
    const [imageSrc, setImageSrc] = useState()
    const css = useStyles(props)
    useEffect(() => {
        setImageSrc(images[imgName])
    }, [imgName])

    return <>
        <button className={css.btn} title={title} >
            <figure>
                <img src={imageSrc} onClick={func} alt="" />
            </figure>
        </button>

    </>
}
export default ButtonIcon;