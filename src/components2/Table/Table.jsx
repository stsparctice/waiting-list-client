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

   const sortobjRuty = (m) => {
      let arr5 = [{ קבוצה: { type: 'readonly', visible: false, value: 'נשים' }, name: { type: 'readonly', visible: true, value: 'ציפי' }, evaluated: { type: 'icon', visible: true, value: true, nameIcon: "vi" } }]
      console.log("m" + m);
      let min = Allobj[0][m].value;
      let mini = 0;
      let arr = []
      console.log(min, "111111111");
      while (Allobj.length > 0) {
         for (let i = 0; i < Allobj.length; i++) {
            for (let j = 0; j < Allobj.length; j++) {
               console.log(Allobj[i][m].value, Allobj[j][m].value);
               if (Allobj[i][m].value < Allobj[j][m].value) {
                  console.log("good", Allobj[i][m], "min", min);
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
