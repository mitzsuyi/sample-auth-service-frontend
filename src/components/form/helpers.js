import Joi from 'joi-browser'

const PasswordSchema = Joi.string()
      .required()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)

const EmailSchema = Joi.string().email()
const NameSchema = Joi.string().required()

const withError = (validation, type) =>{
    let result ={type: type}
    if (validation.error  !== null){
        result.error = validation.error.message.replace(/"value"/, type)
    }
    return result
}
const validatePassword=(password)=>{
 return withError( Joi.validate(password, PasswordSchema), "password")
}

const validateEmail=(email)=>{
  return withError(Joi.validate(email, EmailSchema), "email")
}

const validateName=(name)=>{
  return withError(Joi.validate(name, NameSchema), "name")
}

export {
 validatePassword,
 validateEmail,
 validateName
}