import React, {  useEffect,  useState } from "react";
import { createUseStyles } from "react-jss";
import add from "../../assets/add.png";
import excel from "../../assets/excel.png";
import find from "../../assets/find.png";
import stethoscope from "../../assets/stethoscope.png";
import telephone from "../../assets/telephone.png";
import deleteImg from "../../assets/delete-grey.png"
import edit from "../../assets/edit-grey.png"
import closeIcon from "../../assets/close-red.png"

const useStyles = createUseStyles({

    btn: (props) => ({
        cursor: "pointer",
        padding: [3],

        background: 'none',
        height: props.height,
        width: props.width,
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'transparent',
        transitionDuration: '0.3s',
        transitionProperty: 'all',
        transitionTimingFunction: 'linear',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)'
        },

        '& figure': {
            padding: 0,
            margin: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '& img': {
            objectFit: 'contain',
            height: props.imageSize.height,
            width: props.imageSize.width
        }

    })


})

export const icons = {
    ADD: add,
    EXCEL: excel,
    FIND: find,
    STETHOSCOPE: stethoscope,
    TELEPHONE: telephone,
    CLOSE: closeIcon,
    DELETE: deleteImg, EDIT: edit
}


const ButtonIcon = ({ imgName, title, func, ...props }) => {
    const [imageSrc, setImageSrc] = useState()
    const css = useStyles(props)
    useEffect(() => {
        setImageSrc(imgName)
    }, [imgName])

    return <>
        <button className={css.btn} title={title} onClick={func} >
            <figure>
                <img src={imageSrc} alt="" />
            </figure>
        </button>

    </>
}
export default ButtonIcon;