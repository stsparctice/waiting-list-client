import React, { useEffect, useState } from "react";

import { createUseStyles } from "react-jss";
import Td from "../Td/Td";
import ButtonIcon from "../../ButtonIcon/ButtonIcon";

const useStyles = createUseStyles({
    tr: {

    }
})

const TableRow = ({ data, config, updateFunc, deleteFunc }) => {
    const css = useStyles()
    const [row, setRow] = useState([])

    useEffect(() => {
        const filteredEntries = Object.entries(data).filter(ent => config.hideKeys.includes(ent[0]) === false)
        const showData = filteredEntries.reduce((values, entry) => values = [...values, entry[1]], [])
        setRow(showData)
    }, [data, config])

    return <>
        <tr className={css.tr} >
            {
                row.map((val, i) => (<Td key={i} value={val}></Td>))
            }
            <td>
                <ButtonIcon imgName={'deleteImg'} deleteFunc={() => deleteFunc()}></ButtonIcon>
            </td>
            <td>
                <ButtonIcon imgName={'edit'} updateFunc={() => updateFunc()}></ButtonIcon>
            </td>
        </tr>
    </>
}

export default TableRow;