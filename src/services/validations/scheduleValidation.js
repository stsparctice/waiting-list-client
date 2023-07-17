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
    day.hours.map(async hour => {
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
