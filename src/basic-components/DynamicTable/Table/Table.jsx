import React from "react";

import { createUseStyles } from "react-jss";
import TableRow from "../TableRow/TableRow";
import TableHeader from "../TableHeader/TableHeader";


const useStyles = createUseStyles({
    table: {
        boxShadow:[0,0, 4],
        borderRadius:10,
        marginTop:'10vh',
        margin: 'auto',
        minWidth: '98%',
        textAlign: 'center',
        direction: 'rtl',
        borderCollapse: 'collapse',
        '& tr:nth-child(even)': {
            backgroundColor: 'rgba(0,0,4,0.1)'
        },
        '& tr:hover':{
            backgroundColor:'rgba(0,130,202,0.1)',
        }
    }
})

const Table = ({ config, data, rowbuttons }) => {
    const css = useStyles()
    return <>
        { }
        <table className={css.table}>
            <thead>
                {
                    <TableHeader headers={config.headers}></TableHeader>
                }
            </thead>
            <tbody>
                {data ?
                    data.map((item, index) => (
                        <TableRow key={index} data={item} config={config} buttons={rowbuttons}>

                        </TableRow>
                    )) : <></>}
            </tbody>
        </table>
    </>
}

export default Table;