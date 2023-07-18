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
  console.log('Im in details');
  const css = useStyles()
  console.log(details);
  let start, end;
  if (details[0].startActiveHour) {
    start = 'startActiveHour'
    end = 'endActiveHour'
  }
  else {
    start = 'startHour'
    end = 'endHour'
  }
  return <>
    <h4 className={css.h2}>יום {day} </h4>
    {
      details.map((d, i) => (
        //startHour יהיה startActiveHour לבדוק איך לעשות שבמקום  

        <DetailsDetailed key={i} stratHour={d.startHour} endHour={d.endHour}></DetailsDetailed>
      ))
    }
  </>

}

export default Details