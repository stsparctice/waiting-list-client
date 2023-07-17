import React, { useState, useEffect, useReducer } from "react";
import { createUseStyles } from "react-jss";
import ValueComp from "../ValueComp/ValueComp";
import Row from "../Row/Row"
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
   row: {
      display: 'flex',
      flexDirection: 'row',
      border: 'black solid 1px',
      direction: 'rtl',
      padding: "5px",
      margin: "25px"
   },
   span: {
      margin: "20px"
   },
   spanGroup: {
      margin: "20px",
      backgroundColor: "red"

   },
   e: {
      direction: "rtl"
   },
   thead: {
      backgroundColor: "orange"
   },
   table: {
      borderTop: 'orange solid 2px',
   }

})
// const pushtonewobj = (newObj,obj)=>{
//    newObj=[...newObj,obj]
// }
const Table = ({ Allobj }) => {
   const css = useStyles()

   const sortobj = (m) => {
      console.log("m" + m);
      let min = Allobj[0][m];
      let minB;
      console.log(min);
      let arr = []
      Allobj.map(k => (Allobj.map(l => (k[m].value < l[m].value && k[m] < min.value ? min = k[m] : console.log("kk", k[m], l[m], k, "min", min)))))

      console.log(Allobj);
      Allobj = Object.values(Allobj).map(({ min, ...rest }) => rest)
      console.log();
      arr.push(min)
      console.log("arr", arr);
   }

   return <>
      {
         <div className={css.e}>
            <table >
               <thead className={css.thead}>
                  <tr key={Allobj[0]}>
                     {
                        Object.keys(Allobj[0]).map(m =>
                           <th onClick={() => sortobj(m)} key={m}>{m}</th>
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
