import React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    td: {
        border: '1px solid black'
    }
})

const Td = ({ td }) => {
    const css = useStyles()
    return <>
        {typeof td !== 'object' ? <td className={css.td}>{td}</td> : <td className={css.td2}>{td}</td>}
    </>
}

export default Td;