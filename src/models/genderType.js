const genderType = (gender, age) => {
    let genderTypes = []
    if (gender === 1) {
        //בן
        if (age <= 3) {
            genderTypes = ['בנים', 'מעורב']

        }
        if (age > 3 && age <= 9) {
            genderTypes = ['בנים', 'גברים']
        }
        if (age > 9) {
            genderTypes = ['גברים']
        }
    }
    else {
        //בת
        genderTypes = ['נשים', 'מעורב']
    }
    return genderTypes
}
export default genderType