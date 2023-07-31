import React, { useState, useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";
import vi from "../../assets/vi.png";
import deleteimg from "../../assets/delete.png";
import details from "../../assets/details.png";
import edit from "../../assets/edit.png";
import exclamationMark from "../../assets/exclamationMark.png"


const useStyles = createUseStyles({
    img: {
        padding: "0",
        margin: "0",
        border: "0",
        display: 'flex'
    }
})

const images = {
    'vi': vi,
    'deleteimg': deleteimg,
    'details': details,
    'edit': edit,
    'exclamationMark': exclamationMark
}

const Icon = (obj) => {


    const obj2 = obj.obj
    // {
    //     console.log(images[ obj2.nameIcon]);
    // }
    const css = useStyles()
    const srcref = useRef()
    useEffect(() => {
        srcref.current.setAttribute('src', images[obj2.nameIcon])
    }, [])

    return <>
        <td key={obj}>
            <img ref={srcref} />

            {/* {
         obj2.value ==true?
         <span>
             <img ref={srcref} />
         </span>:
         <span>hhh</span>
 
    } */}
        </td>



    </>
}


export default Icon;