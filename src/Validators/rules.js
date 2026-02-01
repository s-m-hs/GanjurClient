// section 1 :
const requiredValue = 'REQUIED_VALUEdfdsfdsf'      /// <<== this section is only for consol-log and is not necessary data
const minValue = 'MIN_VALUEdfsdf'
const maxValue = 'MAX_VALUEsdfsdf'
const emailValue = 'EMAIL_VALUEsdfsdf'
const phoneValue = 'PHONE_VALUEsdfsdf'


// section 2 :
export const requiedValidator = () => ({            /// <<== this section is sending as prop to input area &
    value: requiredValue
}                         ///       in validator function every of value of this section is compairing 
)                                                ///        by every input data of input area
export const minValidator = (min) => ({
    value: minValue, min
}
)
export const maxValidator = (max) => ({
    value: maxValue, max
}
)
export const emailValidator = () => ({
    value: emailValue
}
)
export const phoneValidator = (minmax) => ({
    value: phoneValue, minmax
}
)


export default { requiredValue, minValue, maxValue, emailValue, phoneValue }