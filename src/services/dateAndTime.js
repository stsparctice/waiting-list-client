
export const hebrewWeekDays = [
    { number: 0, name: 'ראשון' },
    { number: 1, name: 'שני' },
    { number: 2, name: 'שלישי' },
    { number: 3, name: 'רביעי' },
    { number: 4, name: 'חמישי' },
    { number: 5, name: 'שישי' },
]

export class ScheduleTime {
    constructor({hour, min}) {
        this.hour = hour
        this.min = min
    }

    static splitTime(time){
        let split = time.split(':')
        let hour = parseInt(split[0])
        let min = parseInt(split[1])
        return {hour, min}
    }

    clone(){
        return new ScheduleTime({hour:this.hour, min:this.min})
    }

    toString() {
        return `${this.hour.toString().padStart(2, '0')}:${this.min.toString().padStart(2, '0')}`
    }

    addMinutes(min) {
        this.min += min;
        if (this.min >= 60) {
            this.hour += parseInt(this.min) / 60
            this.min = parseInt(this.min) % 60
        }
    }

    getTime() {
        return this.hour * 60 + this.min
    }
}


export const defaultHours = {
    start: {hour:7, min:0},
    end: {hour:22, min:0},

}





export const getTimesList = ( start = new ScheduleTime(defaultHours.start), end = new ScheduleTime(defaultHours.end), interval = 30) => {
    let hours = []
    console.log(start);
    while (start.getTime() < end.getTime()) {
        start.addMinutes(interval)
        hours.push(start.clone())

    }
    return hours
}


