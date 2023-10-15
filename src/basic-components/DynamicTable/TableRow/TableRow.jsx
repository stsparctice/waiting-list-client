import React, { useEffect, useState, memo } from "react";

import Td from "../Td/Td";
import ButtonIcon from "../../ButtonIcon/ButtonIcon";
import icons from "../../../services/iconService";


const TableRow = ({ data, config, update, remove }) => {
    const [row, setRow] = useState([])
    useEffect(() => {
        const filteredEntries = Object.entries(data).filter(ent =>
            config.hideKeys.indexOf(ent[0]) === -1)
        const sortedHeaders = config.headers.map((h, i) => ({ index: i, ...h }))
        const sortedEntries = filteredEntries.reduce((arr, ent) => {
            let header = sortedHeaders.find(h => h.key === ent[0])
            if (header) {
                arr[header.index] = ent
            }
            return arr
        }, [])
        const showObject = sortedEntries.map(e => {
            const dataCell = { value: e[1] }
            if (config.keyElements.some(k => k.key === e[0])) {
                dataCell.element = config.keyElements.find(k => k.key === e[0]).element
            }
            if (config.convertKeys.some(k => k.key === e[0])) {
                const convert = config.convertKeys.find(({ key }) => key === e[0])
                if (convert.value === e[1]) {
                    dataCell.value = convert.display
                }
            }
            return dataCell
        })

        setRow(showObject)
    }, [data, config])

    return <>
        <tr >
            {
                row.map((val, i) => (<Td key={i} datacell={val}></Td>))
            }

            <td style={{ width: 50 }}>
                <ButtonIcon imgName={icons.EDIT} func={() => update(data)} btnStyle={{ imgwidth: "17px", imgheight: "17px", height: "35px", width: "35px" }} title={'עדכן'} backgroundColor="green"></ButtonIcon>
            </td>
            <td style={{ width: 50 }}>
                <ButtonIcon imgName={icons.DELETE} func={() => remove(data)} btnStyle={{ imgwidth: "17px", imgheight: "17px", height: "35px", width: "35px" }} title={'מחק'} backgroundColor="red"></ButtonIcon>
            </td>
        </tr>
    </>
}

export default memo(TableRow);