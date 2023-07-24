import React, { useEffect, useContext, useState, useRef, useCallback } from "react";
import HoursDetailContext from '../../contexts/HoursDetails'
import BasicDetailsInRow from "../BasicDetailsInRow/BasicDetailsInRow"
import DetailsDetailed from "../DetailsDetailed/DetailsDetailed"
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  h2: {
    direction: 'rtl',
    marginRight: '20px'
  }
})


const Details = ({ day, type,funcDelete ,funcDetails}) => {
  const {details}= useContext(HoursDetailContext)
  const css = useStyles()
  let start, end,flag=false;

  if(type=='notInActiveHours')
    flag=true;
  return <>
    <h4 className={css.h2}>יום {day} </h4>
    {flag?<h5 className={css.h2}>הבריכה אינה פעילה:</h5>:''}
    {
      details.map((d, i) => (
        //startHour יהיה startActiveHour לבדוק איך לעשות שבמקום  
       d.day===day&&d.type===type?<DetailsDetailed key={i} stratHour={d.start} endHour={d.end} flag={flag} funcDelete={funcDelete} funcDetails={funcDetails}day={d.day}></DetailsDetailed>:''
      ))
    }
  </>

}

export default Details