import React, { useState, useEffect, useReducer } from "react";
import { createUseStyles } from "react-jss";
import Row from "../Row/Row"

const useStyles = createUseStyles({
   row: {
      display: 'flex',
      flexDirection: 'row',
      border: 'black solid 1px',
      direction: 'rtl',
      padding: "5px",
      margin: "25px",
   },
   span: {
      margin: "20px"
   },
   spanGroup: {
      margin: "20px",
      backgroundColor: "red"

   },
   e: {
      direction: "rtl",
      backgroundColor: "#ededed"
   },
   thead: {
      backgroundColor: "orange",
      // display: "flex",
      justifyContent: "space-between"
   },
   table: {
      // borderTop: 'orange solid 2px',
      borderCollapse: 'collapse'
   },
   th: {
      padding: '8px',
      color: "white",
   }

})

const Table = ({ All }) => {
   const [Allobj, setAllobj] = useState(All);
   const css = useStyles()
   const sortobj = (m) => {
      let arr5 = [{ קבוצה: { type: 'readonly', visible: false, value: 'נשים' }, name: { type: 'readonly', visible: true, value: 'ציפי' }, evaluated: { type: 'icon', visible: true, value: true, nameIcon: "vi" } }]
      let min = Allobj[0][m].value;
      let mini = 0;
      let arr = []
      while (Allobj.length > 0) {
         for (let i = 0; i < Allobj.length; i++) {
            for (let j = 0; j < Allobj.length; j++) {
               if (Allobj[i][m].value < Allobj[j][m].value) {
                  if (Allobj[i][m].value < min) {
                     min = Allobj[i][m].value
                     mini = i
                  }
               }
            }
         }

         arr.push(Allobj[mini])
         Allobj.splice(mini, 1)
         if (Allobj.length > 0) {
            min = Allobj[0][m].value;
            mini = 0;
         }
      }
      setAllobj(arr)
      arr = []
   }
   return <>
      {

         <div className={css.e}>
            <table className={css.table}>
               <thead className={css.thead}>
                  <tr key={Allobj[0].name}>
                     {
                        Object.keys(Allobj[0]).map(m =>
                           <th className={css.th} onClick={() => sortobj(m)} key={m}>{m}</th>
                        )
                     }
                  </tr>
               </thead>
               <tbody>
                  {
                     Allobj.map((k,index) => (
                        <Row key={index} objRow={k} ></Row>
                     ))
                  }
               </tbody>
            </table>
         </div>
      }
   </>
}
export default Table;
