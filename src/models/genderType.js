const genderType = (gender, age) => {
    let genderTypes = []
    if (gender == 1) {
        //בן
        switch (age == age) {
            case age <= 3:
                genderTypes = ['בנים', 'מעורב']
                console.log('0-3');
                break;
            case age > 3 && age <= 9:
                genderTypes = ['בנים', 'גברים']
                console.log('3-9');
                break
            case age > 9:
                genderTypes = ['גברים']
                console.log('9-120');
                break
            default:
                console.log('wwwwwwwww');
                break;
        }
    }
    else {
        //בת
        genderTypes = ['נשים', 'מעורב']
        console.log('female');
    }
    return genderTypes
}
export default genderType