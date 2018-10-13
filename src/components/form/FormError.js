import React from 'react';

import {Help} from 'bloomer'

const FormInput = ({error})=>{
  if(error) return <Help isColor="danger">{error}</Help>
  return null
}

export default FormInput

