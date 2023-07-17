import React from "react";

import { createUseStyles } from "react-jss";



const useStyles = createUseStyles({
    th: {
        border: '1px solid black'
    },
    th2:{
        width:'5%'
    }
})

const Th = ({ th }) => {
    const css = useStyles()
    return <>
        {th !== '' ? <th className={css.th}>{th}</th> : <th className={css.th2}>{th}</th>}
    </>
}

export default Th;