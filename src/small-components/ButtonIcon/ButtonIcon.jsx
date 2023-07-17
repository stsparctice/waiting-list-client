import React, { useEffect, useRef} from "react";
import { createUseStyles } from "react-jss";
import add from "../../assets/add.png";
import excel from "../../assets/excel.png";
import find from "../../assets/find.png";

const useStyles = createUseStyles({

    img: {
        padding: 0,
        margin: 0,
        border: 0,
        cursor: "pointer",
        // width: '36px',
        // height: '36px',
        // marginLeft:45,
        // borderTop:54
    }

})

const images = {
    'add': add,
    'excel': excel,
    'find': find
}


const Icon = ({ imgName }) => {
    const css = useStyles()
    const srcRef = useRef()
    useEffect(() => {
        srcRef.current.setAttribute('src', images[imgName])
    }, [])

    return <>
        <button className={css.img} >
            <img ref={srcRef} style={{width: '36px' , height:'36px'}} />
        </button>

    </>
}
export default Icon;