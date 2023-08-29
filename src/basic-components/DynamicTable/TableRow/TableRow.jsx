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
        const showObject = filteredEntries.map(e => {
            const dataCell = { value: e[1] }
            if (config.keyElements.some(k => k.key === e[0])) {
                dataCell.element = config.keyElements.find(k => k.key === e[0]).element
            }
            return dataCell
        })
        // const showData = filteredEntries.reduce((values, entry) => values = [...values, entry[1]], [])

        setRow(showObject)
    }, [data, config])

    return <>
        <tr className={css.tr} >
            {
                row.map((val, i) => (<Td key={i} datacell={val}></Td>))
            }

            <td>
                <ButtonIcon imgName={'edit'} func={() => updateFunc()} imageSize={{ width: "20px", height: "20px" }} height="35px" width="70px" title={'עדכן'} backgroundColor="green"></ButtonIcon>
            </td>
            <td>
                <ButtonIcon imgName={'deleteImg'} func={() => deleteFunc()} imageSize={{ width: "20px", height: "20px" }} height="35px" width="70px" title={'מחק'} backgroundColor="red"></ButtonIcon>
            </td>
        </tr>
    </>
}

export default TableRow;