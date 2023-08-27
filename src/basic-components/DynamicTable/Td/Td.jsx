import React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    td: {
        border: '1px solid black'
    }
})

const Td = ({  value }) => {
    const css = useStyles()
    return <>
        <td className={css.td}>{value}</td> 
    </>
}

export default Td;