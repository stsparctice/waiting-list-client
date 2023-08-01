import Timetable from "./Timetable";


const TimetableForDay = ({ obj }) => {
    return <>
        {
            obj.day.hours.map((item, i) => {
                if (obj.gender.includes(item.gender)) {
                    if (obj.update) {
                        for (let j = 0; j < obj.update.hours.length; j++) {
                            if (item.startHour <= obj.update.hours[j].startHour && item.endHour >= obj.update.hours[j].endHour && obj.update.hours[j].poolName === obj.day.poolName) {
                                return <Timetable key={`${obj.index}${i}`}  obj={{ timeTable: { ...item, poolName: obj.day.poolName, day: obj.day.day }, index: `${obj.index}${i}`, update: obj.update.hours[j] }} ></Timetable>
                            }
                        }
                    }
                    return <Timetable key={`${obj.index}${i}`}  obj={{ timeTable: { ...item, poolName: obj.day.poolName, day: obj.day.day }, index: `${obj.index}${i}` }} ></Timetable>

                }
            })
        }

    </>
}

export default TimetableForDay;
