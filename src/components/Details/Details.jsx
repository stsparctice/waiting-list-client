import BasicDetailsInRow from "../BasicDetailsInRow/BasicDetailsInRow"
import DetailsDetailed from "../DetailsDetailed/DetailsDetailed"
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  h2: {
    direction: 'rtl',
    marginRight: '20px'
  }
})


const Details = ({ day, details }) => {
  const css = useStyles()
  let start, end,flag=false;
  if (details[0].startActiveHour) {
    start = 'startActiveHour'
    end = 'endActiveHour'
  }
  else {
    if (details[0].startHour) {
    start = 'startHour'
    end = 'endHour'
    }
    else{
      start = 'StartNotInActiveHour'
      end = 'endNotInActiveHour'
      flag=true;
    }
  }
  return <>
    <h4 className={css.h2}>יום {day} </h4>
  {flag?<h5 className={css.h2}>הבריכה אינה פעילה בין השעות:</h5>:''}
    {console.log('start',start,'end',end)}
    {
      details.map((d, i) => (
        //startHour יהיה startActiveHour לבדוק איך לעשות שבמקום  
        <DetailsDetailed key={i} stratHour={d[`${start}`]} endHour={d[`${end}`]}></DetailsDetailed>
      ))
    }
  </>

}

export default Details