import React from 'react';

import {Input} from 'bloomer'

const fieldColor= (hasError)=> {
    return hasError !== undefined ? "danger" : "success"
 }   

const FormInput = ({onChange, errors, ...props})=>(
  <Input isColor={fieldColor(errors)} {...props} onChange={evt=>onChange(evt.target.value)}></Input>
)

export default FormInput

