import React, { useCallback, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";


const useStyles = createUseStyles({
    wrapper: {
        marginRight: '1050px',
        marginTop: '0'
    },
    bigDiv: {
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
        borderLeft: "40px solid transparent",
        borderRight: '40px solid transparent',
        borderBottom: '25px solid transparent'
    }

})


const Sexs = ({ genderName, color }) => {
    const css = useStyles();

    return <>
        <div className={css.wrapper}>
            {genderName ?
                <div className={css.bigDiv} style={{ backgroundColor: color }}>
                    {genderName}
                    <div className={css.triangle} style={{
                        borderTop: `25px solid ${color}`}}></div>
                </div>

                : <></>
            }
        </div>
    </>
}

export default Sexs