import rules from './rules'
import regexes from './regexes';

const validator = (input, validArry) => {
    // console.log('validator==>', input, validArry);

    const arrayPushvalid = []
    for (const item of validArry) {

        if (item.value === rules.requiredValue) {
            input.trim().length === 0 && arrayPushvalid.push(false)
        } else if (item.value === rules.minValue) {
            input.trim().length < item.min && arrayPushvalid.push(false)
        } else if (item.value === rules.maxValue) {
            input.trim().length > item.max && arrayPushvalid.push(false)
        } else if (item.value === rules.emailValue) {
         !regexes.testEmail(input) && arrayPushvalid.push(false)
        } else if (item.value === rules.phoneValue) {
            !(input.trim().length === item.minmax) && arrayPushvalid.push(false)
        }


    }


    if (arrayPushvalid.length != 0) {
        return false
    } else {
        return true
    }



}




export default validator