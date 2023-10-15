
export const hebrewWeekDays = [
    { number: 0, name: 'ראשון' },
    { number: 1, name: 'שני' },
    { number: 2, name: 'שלישי' },
    { number: 3, name: 'רביעי' },
    { number: 4, name: 'חמישי' },
    { number: 5, name: 'שישי' },
]


export const defaultHours = {
    start: new Date(0, 0, 0, 7, 0),
    end: new Date(0, 0, 0, 22, 0),

}



export const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
}


export const getTimesList = (day, start = defaultHours.start, end = defaultHours.end, interval = 30) => {
    let hours = []
    while (start.getTime() < end) {
        start = addMinutes(start, interval)
        hours.push(start)
    }
    return hours
}


