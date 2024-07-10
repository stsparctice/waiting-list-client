export async function checkHours(timeTable) {
    const exist = timeTable.some(item => !checkHoursForDay(item))

    return !exist;
}

function checkHoursForDay(day) {
    console.log({ day })
    let hour = day.hours.find(hour => hour.startHour >= hour.endHour)

    return hour ? false : true
}

export async function removalIndexsAndCheckEmptyOption(timeTable) {
    timeTable.forEach(day => {
        day.hours.forEach((hour, index) => {
            if (hour.startHour === '' || hour.endHour === '') {
                day.hours.pop(day.hours[index])
            }
            else
                day.hours[index] = { startHour: hour.startHour, endHour: hour.endHour, poolName: hour.poolName, gender: hour.gender }

        })
        if (day.hours.length === 0) {
            timeTable.pop(day)
        }

    })
}


export const checkHoursDiff = (start, end) => {
    return start.getTime() < end.getTime()
}

export const checkAvailableHours = ({ day, id = 0, start, end }) => {
    if (id) {
        const current = day.schedules.find(schedule => schedule.id === id)
        console.log({ current });
        if (start.getTime() < current.startHour.getTime()) {
            const error = day.schedules.find(({ startHour, endHour, id , genderId}) => id !== current.id && current.genderId.id !==  genderId.id&& startHour.getTime() <= start.getTime() && endHour.getTime() > start.getTime())
            if (error) {
                throw new Error('שעת התחלה מתנגשת עם קבוצה קימת')
            }
        }

        if (end.getTime() > current.endHour.getTime()) {
            const error = day.schedules.find(({ startHour, endHour, id,genderId }) => id !== current.id && current.genderId.id !==  genderId.id&& startHour.getTime() < end.getTime() && endHour.getTime() > end.getTime())
            if (error) {
                throw new Error('שעת סיום מתנגשת עם קבוצה קימת')
            }
        }
    }
    else {
        if (day.schedules.length === 0)
            return true
        const error1 = day.schedules.find(({ startHour, endHour }) => startHour.getTime() < start.getTime() && endHour.getTime() > end.getTime())
        if (error1) {
            throw new Error('תווך הזמן שנבחר קיים במערכת')
        }

        const error2 = day.schedules.find(({ startHour, endHour }) => startHour.getTime() > start.getTime() && endHour.getTime() < end.getTime())
        if (error2) {
            throw new Error('במערכת קיים זמן הכלול בזמנים שנבחרו')
        }

        const error3 = day.schedules.find(({ startHour }) => startHour.getTime() > start.getTime() && startHour.getTime() < end.getTime())
        if (error3) {
            throw new Error('סוף הזמן שנבחר נמצא בזמן הקיים במערכת')
        }

        const error4 = day.schedules.find(({ startHour, endHour }) => startHour.getTime() < start.getTime() && start.getTime() < endHour.getTime())
        if (error4) {
            throw new Error('תחילת הזמן שנבחר נמצא בזמן הקיים במערכת')
        }
    }
    return true;
}

export const checkTimeInBlock = ({ startHour, endHour }, block) => {
    return block.getTime() >= startHour.getTime() && block.getTime() < endHour.getTime()
}
