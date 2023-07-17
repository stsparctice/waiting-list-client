import Timetable from "./Timetable";


const TimetableForDay = ({ obj, func }) => {
    return <>
        {
            obj.day.hours.map((item, i) => {
                if (obj.gender.includes(item.gender)) {
                    if (obj.update) {
                        if (item.startHour <= obj.update.hours[0].startHour && item.endHour >= obj.update.hours[0].endHour && obj.update.hours[0].poolName === obj.day.poolName) {
                            return <Timetable key={`${obj.index}${i}`} func={func} obj={{ timeTable: { ...item, poolName: obj.day.poolName, day: obj.day.day }, index: `${obj.index}${i}`, update: obj.update }} ></Timetable>
                        }
                    }
                    return <Timetable key={`${obj.index}${i}`} func={func} obj={{ timeTable: { ...item, poolName: obj.day.poolName, day: obj.day.day }, index: `${obj.index}${i}` }} ></Timetable>

                }
            })
        }

    </>
}

export default TimetableForDay;
