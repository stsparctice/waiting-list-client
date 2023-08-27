import React from "react";

import { createUseStyles } from "react-jss";
import Th from "../Th/Th";

const useStyles = createUseStyles({
    tr: {

    }
})

const TableHeader = ({headers,  }) => {
    const css = useStyles()
    return <>
        <tr className={css.tr} >
           {
            headers.map((hd, i)=>(
                <Th key={`hd${i}`} th={hd.header}></Th>
            ))
           }
        </tr>
    </>
}

export default TableHeader;