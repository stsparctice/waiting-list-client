import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import pen from "../../assets/pen.png"
import location from "../../assets/location.png"
import garbage from "../../assets/garbage.png"

const useStyles = createUseStyles({
    remark: {
        display: 'flex',
        // gridColumn:'1 /4',
    },
    placing: {
        flexBasis: 0,
    },
    text: {
        flexGrow: 4,
    },
    user: {
        flexGrow: 1,
    }

})

const ShowRemark = ({ remark, removeRemark }) => {
    const css = useStyles()
    const srcRef = useRef()
    const srcGarb = useRef()

    useEffect(() => {
        switch (remark.placing) {
            case 'שיבוץ':
                srcRef.current.setAttribute('src', location);
                break;
            case 'תיעוד':
                srcRef.current.setAttribute('src', pen)
                break;
            default:
                srcRef.current.setAttribute('src', pen)
                break;
        }
        srcGarb.current.setAttribute('src', garbage)
    }, [])

    const remove = () => {
        removeRemark(remark.text)
    }

    return <>
        <div className={css.remark}>
            {
                remark ?
                    <>
                        <img ref={srcRef} alt="" className={css.placing} />
                        <span className={css.text}>{remark.text}</span>
                        <span className={css.user}>{remark.user}</span>
                        <span>{new Date(remark.date).toLocaleDateString()}</span>
                        <img ref={srcGarb} alt="" onClick={(e) => { remove() }} />
                    </> : ""
            }
        </div>
    </>
}
export default ShowRemark;