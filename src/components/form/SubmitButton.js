import React from "react";
import LoadingButton from './LoadingButton'
import {withState, compose, withHandlers, lifecycle} from 'recompose'

const SubmitButton = ({isValid, disabled, setDisabled, handleOnClick, isLoading,...props})=>(              
 <LoadingButton onClick={handleOnClick} isLoading={isLoading} isStatic={!isValid || disabled || (isValid &&isLoading)} {...props}>Submit</LoadingButton>
)

const enhance=compose(
  withState("disabled", "setDisabled", false),  
  lifecycle({
    componentWillReceiveProps(){
       if(this.props.disabled) this.props.setDisabled(false)
    }
  }),
  withHandlers({
      handleOnClick: ({onClick, setDisabled})=>(event) =>{
        setDisabled(true)
        onClick(event) 
      }  
   })
)
export default enhance(SubmitButton) 