export async function checkHours(timeTable) {
    let flag = true;
    timeTable.map(item => {
        if (!checkHoursForDay(item)) {
            flag = false;
        }
    })
    return flag;
}

function checkHoursForDay(day) {
    let flag = true
    day.hours.map(hour => {
        if (hour.startHour >= hour.endHour) {
            flag = false
        }
    })
    return flag
}

export async function removalIndexsAndCheckEmptyOption(timeTable) {
    timeTable.map(day => {
        day.hours.map((hour, index) => {
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

export const checkAvailableHours = (day, start, end) => {
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

    return true;
}

export const checkTimeInBlock = ({ startHour, endHour }, block) => {
    return block.getTime() >= startHour.getTime() && block.getTime() < endHour.getTime()
}
