import {compose, withProps} from 'recompose'

const withFormValidation = compose(
    withProps(({getValidations, api, ...props})=>{
       if(!api) return
       const validations = getValidations(props)
       const errors={}
       let hasError = false
       const withError = (validation)=>{
        if (validation.error) {
            errors[validation.type]=validation.error
            hasError = true
        }   
         return true
       }
       validations.every(withError)
       return {
            isValid: !hasError,
            errors:errors
        }
    })    
)

export default withFormValidation
