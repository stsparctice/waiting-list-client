import React, { useCallback, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";


const useStyles = createUseStyles({
    wrapper: {
        marginRight: '1050px',
        marginTop:'0'
    },
    bigDiv: {
        backgroundColor: "rgb(50, 228, 63)",
        height: '50px',
        width: '80px',
        color: 'white',
        textAlign: 'center',
        paddingTop: '10px'

    },
    triangle: {
        marginTop: '20px',
        height: '50px',
        width: '80px',
        borderTop: '25px solid rgb(50, 228, 63)',
        borderLeft: "40px solid transparent",
        borderRight: '40px solid transparent',
        borderBottom: '25px solid transparent'
    }

})


const Sexs = (genderName) => {
    const css = useStyles();

    return <>
        <div className={css.wrapper}>
            {genderName ?
                <div className={css.bigDiv}>
                    {genderName.genderName}
                    <div className={css.triangle}></div>
                </div>

                : <></>
            }
        </div>
    </>
}

export default Sexs